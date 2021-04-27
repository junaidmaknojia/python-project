import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from flask_socketio import SocketIO, send, emit, join_room, leave_room

from .models import db, User, Message
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.message_routes import message_routes

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

socketio = SocketIO(app, cors_allowed_origins='*')
# from .socketio import socket_decorators

app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(message_routes, url_prefix='/api/messages')
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
    print(data)
    room = data["room"]
    new_message = Message(body=data["body"], 
                          user_id=data["user_id"], 
                          channel_id=data["room"])
    db.session.add(new_message)
    db.session.commit()
    send(data, room=data["room"], broadcast=True)
    return None


@socketio.on("join_room")
def on_join(data):
    print(f'{data["user_id"]} has joined {data["room"]}')
    room = data["room"]
    join_room(room)


@socketio.on("leave_room")
def on_leave(data):
    print(f'{data["user_id"]} has left the building')
    room = data["room"]
    leave_room(room)

# @socketio.on("connect")
# def handle_connect():
#     print("client connected")

# @socketio.on("message")
# def handleMessage(data):
#     print(data)
#     send(data, broadcast=True)
#     return None


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
