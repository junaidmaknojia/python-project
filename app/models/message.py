from .db import db
from datetime import datetime


class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.Text, nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey("channels.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(), nullable=False)
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(), nullable=False)
    channel = db.relationship("Channel", back_populates="messages")
    user = db.relationship("User", back_populates="messages")

    def to_dict(self):
        return {
            "id": self.id,
            "body": self.body,
            "channel_id": self.channel_id,
            "user_id": self.user_id
        }
