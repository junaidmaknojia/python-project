from flask import Blueprint, jsonify, session, request
from app.models import Reaction, Message, db
from flask_login import current_user

reaction_routes = Blueprint('reaction', __name__)


@reaction_routes.route('', methods=['POST'])
def add_reactions():
    data = request.json

    postDict = {
        "type": data["emoji"],
        "user_id": current_user.id,
        "message_id": data["messageId"]
    }

    newReaction = Reaction(**postDict)
    db.session.add(newReaction)
    db.session.commit()
    messageReactions = Reaction.query.filter(Reaction.message_id == data["messageId"]).all()
    returnReactions = {"reactions": [reaction.to_dict() for reaction in messageReactions]}
    return returnReactions
