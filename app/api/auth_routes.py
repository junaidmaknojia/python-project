from flask import Blueprint, jsonify, session, request
from app.models import User, Channel, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from app.S3 import upload_file_to_s3, allowed_file, get_unique_filename

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        channels = {"channel": list(map(lambda ch: ch.to_dict(), user.channels))}
        glbl_id = None
        for channel in channels["channel"]:
            if (channel["type"] == "g"):
                glbl_id = channel
        return {"user": user.to_dict(), "channels": channels, "glbl": glbl_id["id"]}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    print(form.data, 'request data')
    print(request.cookies)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        url = None
        if request.files["image"]:
            print("In if statement")
            image = request.files["image"]
            if not allowed_file(image.filename):
                print('File type not permitted')

            image.filename = get_unique_filename(image.filename)

            upload = upload_file_to_s3(image)
            if upload["url"]:
                url = upload["url"]

        glbl = Channel.query.filter(Channel.title == 'Global Chatroom').first()

        user = User(
            first_name=form.data['firstName'],
            last_name=form.data['lastName'],
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            picture_url=url
        )
        glbl.users.append(user)
        db.session.add(user)
        db.session.commit()
        login_user(user)
        user = User.query.filter(User.email == form.data['email']).first()
        channel = glbl.to_dict()
        channels = {"channel": [channel]}
        return {"user": user.to_dict(), "channels": channels, "glbl": channel["id"]}

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
