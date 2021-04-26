from .db import db
from datetime import datetime


class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(), nullable=False)
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(), nullable=False)
    owner = db.relationship("User")
    messages = db.relationship("Message")
    users = db.relationship("User", secondary="channel_users")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "type": self.type
        }
