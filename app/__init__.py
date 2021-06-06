import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager, current_user
from flask_socketio import SocketIO, send, emit, join_room, leave_room

from .models import db, User, Message, Reaction
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.channel_routes import channel_routes
from .api.message_routes import message_routes
from .api.channel_users_routes import channel_users_routes
from .api.reaction_routes import reaction_routes
from .api.glbl_routes import glbl_routes

from .seeds import seed_commands

from .config import Config

app = Flask(__name__)

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "https://sn4ck.herokuapp.com",
        "https://sn4ck.herokuapp.com",
    ]
else:
    origins = '*'

socketio = SocketIO(app, cors_allowed_origins=origins)
# from .socketio import socket_decorators

app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(channel_routes, url_prefix='/api/channel')
app.register_blueprint(message_routes, url_prefix='/api/messages')
app.register_blueprint(channel_users_routes, url_prefix='/api/channelusers')
app.register_blueprint(reaction_routes, url_prefix='/api/reaction')
app.register_blueprint(glbl_routes, url_prefix='/api/glbl')
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)

# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........


@socketio.on("connect")
def handle_connect():
    print("client connected")


@socketio.on("message")
def handleMessage(data):
    if data["type"] == "new":
        room = data["room"]
        new_message = Message(
            body=data["body"],
            user_id=data["user_id"],
            channel_id=data["room"]
        )

        db.session.add(new_message)
        db.session.commit()
        # message = Message.query.filter(Message.body == data["body"]).one()
        data["id"] = new_message.id
        send(data, room=data["room"], broadcast=True)
        return None
    elif data["type"] == "edit":
        room = data["room"]
        message = Message.query.filter(Message.id == data["id"]).one()
        message.body = data["body"]
        db.session.commit()
        data=message.to_dict()
        data["new"] = False
        send(data, room=room, broadcast=True)
        return None
    elif data["type"] == "delete":
        room = data["room"]
        message = Message.query.filter(Message.id == data["id"]).one()
        message_reactions = message.reactions
        db.session.delete(message)
        db.session.commit()
        send(data, room=room, broadcast=True)
        return None


@socketio.on("reactions")
def handleReactions(data):
    new_reaction = Reaction(
        type=data["type"],
        message_id=data["message_id"],
        user_id=data["user_id"]
    )
    db.session.add(new_reaction)
    db.session.commit()
    emit("reactionsBack", data, broadcast=True)


@socketio.on("join_room")
def on_join(data):
    print(f'{data["name"]} has joined {data["room"]}')
    room = data["room"]
    join_room(room)


@socketio.on("leave_room")
def on_leave(data):
    print(f'{data["name"]} has left the building')
    room = data["room"]
    leave_room(room)

# @socketio.on("connect")
# def handle_connect():
#     print("client connected")


@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get(
                            'FLASK_ENV') == 'production' else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') == 'production' else None,
                        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')


if __name__ == "__main__":
    socketio.run(app)
