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
    owner = db.relationship("User", back_populates="my_channels")
    messages = db.relationship("Message", back_populates="channel")
    users = db.relationship("User", secondary="channel_users", back_populates="channels")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "type": self.type,
            "owner": self.user_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "users": list(map( lambda user: user.to_dict(), self.users))
        }
