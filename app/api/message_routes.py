from flask import Blueprint, jsonify
from app.models import Message, db


message_routes = Blueprint('messages', __name__)


@message_routes.route('/<int:channel_id>')
def get_messages(channel_id):
    messages = Message.query.filter(Message.channel_id == channel_id).order_by(Message.created_at.desc()).all()
    return {'message': [message.to_dict() for message in messages]}