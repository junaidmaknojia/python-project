from app.models import db, Channel, User


def seed_channels():
    glbl = Channel(type='ch', title='Global Chatroom')
    db.session.add(glbl)
    db.session.commit()


def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
