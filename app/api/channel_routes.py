from flask import Blueprint, jsonify, session, request
from app.models import User, Channel, db
from flask_login import current_user

channel_routes = Blueprint('channel', __name__)


@channel_routes.route('')
def get_channels():
    if (current_user.is_authenticated):
        user = User.query.filter(User.id == current_user.id).one()
        channel_collection = user.channels
        channels = {"channel": list(map(lambda ch: ch.to_dict(), channel_collection))}
        return channels

    return {"error": "error"}


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
    currUser = current_user.to_dict()
    otherUsers = data["otherUsers"]
    otherUsers.append(currUser)
    usersList = list([user["username"] for user in otherUsers])
    title = ",".join(usersList)
    package = {"type": "dm", "title": title, "user_id": currUser["id"]}
    newDM = Channel(**package)
    for user in otherUsers:
        found_user = User.query.filter(User.id == user["id"]).one()
        newDM.users.append(found_user)
    db.session.add(newDM)
    db.session.commit()
    return newDM.to_dict()


@channel_routes.route("/all")
def get_all_channels():
    channelList = Channel.query.filter(Channel.type == "ch").all()
    allChannels = {"channel": list(
        map(lambda ch: ch.to_dict(), channelList))}
    return allChannels


@channel_routes.route("/allDMs")
def get_all_dms():
    dms_list = Channel.query.filter(Channel.type == "dm").all()
    allDMs = {"dms": list(
        map(lambda ch: ch.to_dict(), dms_list))}
    return allDMs
