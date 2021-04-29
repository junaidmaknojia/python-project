from flask import Blueprint, jsonify, session, request
from app.models import User, Channel, db
from flask_login import current_user

channel_routes = Blueprint('channel', __name__)


@channel_routes.route('')
def get_channels():
    user = User.query.filter(User.id == current_user.id).one()
    channel_collection = user.channels
    channels = { "channel": list(map(lambda ch: ch.to_dict(), channel_collection)) }
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



@channel_routes.route("/join", methods=["POST"])
def join_channel():
    data = request.json
    userId = data["user_id"]
    user = User.query.filter(User.id == userId).one()
    channelId = data["channelId"]
    foundChannel = Channel.query.filter(Channel.id == channelId).one()
    foundChannel.users.append(user)
    db.session.commit()
    return foundChannel.to_dict()


@channel_routes.route("/dm", methods=["POST"])
def create_DM():
    data = request.json
    otherUserId = data["otherUserId"]
    user_id = data["user_id"]
    otherUser = User.query.filter(User.id == otherUserId).one()
    currUser = User.query.filter(User.id == user_id).one()
    title = f"{currUser.username},{otherUser.username}"
    package = {"type": "dm", "title": title, "user_id": user_id}
    newDM = Channel(**package)
    newDM.users.append(otherUser)
    newDM.users.append(currUser)
    db.session.add(newDM)
    db.session.commit()
    return newDM.to_dict()


@channel_routes.route("/all")
def get_all_channels():
    channelList = Channel.query.filter(Channel.type == "ch").all()
    allChannels = {"channel": list(
        map(lambda ch: ch.to_dict(), channelList))}
    return allChannels
