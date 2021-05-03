from flask import Blueprint, jsonify, session, request
from app.models import User, Channel, db
from flask_login import current_user

glbl_routes = Blueprint('glbl', __name__)


@glbl_routes.route('')
def get_global():
    if (current_user.is_authenticated):
        globl = Channel.query.filter(Channel.type == "g").one()
        return globl.to_dict()
    return {"error": "error"}
