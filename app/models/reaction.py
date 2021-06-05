from .db import db
from datetime import datetime


class Reaction(db.Model):
    __tablename__ = 'reactions'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    message_id = db.Column(db.Integer, db.ForeignKey("messages.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(), nullable=False)
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(), nullable=False)
    message = db.relationship("Message", back_populates="reactions")
    user = db.relationship("User", back_populates="reactions")

    def to_dict(self):
        return {
            "id": self.id,
            "type": self.type,
            "message_id": self.message_id,
            "user_id": self.user_id,
            # "created_at": self.created_at,
            "user": {
                "username": self.user.username,
            }
        }
