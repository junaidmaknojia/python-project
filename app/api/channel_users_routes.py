from flask import Blueprint, jsonify, session, request
from app.models import db, User, Channel, channel_users

channel_users_routes = Blueprint('channel_users', __name__)


@channel_users_routes.route('/<int:channel_id>/<int:user_id>', methods=['POST'])
def add_user_to_channel(channel_id, user_id):
    # TO-DO need to add in logic to DB to prevent users from joining channel multiple times
    user = User.query.filter(User.id == user_id).one()
    channel = Channel.query.filter(Channel.id == channel_id).one()
    channel.users.append(user)
    db.session.commit()
    return channel.to_dict()
