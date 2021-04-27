from flask import Blueprint, jsonify, session, request
from app.models import User, Channel, db
from flask_login import current_user

channel_routes = Blueprint('channel', __name__)


@channel_routes.route('')
def get_channels():
  print(current_user.id, 'here!!!!!!!!!!!!!!!!!!!!!!')
  user = User.query.filter(User.id == current_user.id).one()
  channel_collection = user.channels
  channels= { "channel": list(map(lambda ch: ch.to_dict(), channel_collection)) }
  return channels


@channel_routes.route('', methods=['POST'])
def add_channel():
  data = request.json
  channel = Channel(**data)
  user = User.query.filter(User.id == current_user.id).one()
  channel.users.append(user)
  db.session.add(channel)
  db.session.commit()
  return channel.to_dict()
