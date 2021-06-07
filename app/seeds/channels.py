from app.models import db, Channel, User


def seed_channels():
    glbl = Channel(type='ch', title='Global Chatroom')
    db.session.add(glbl)
    db.session.add(Channel(type="ch", title="Midnight munchies"))
    db.session.add(Channel(type="ch", title="Road trip chips"))
    db.session.add(Channel(type="ch", title="Fruit by the Fathom"))
    db.session.add(Channel(type="ch", title="Presidential Sour Warheads"))
    db.session.add(Channel(type="ch", title="Magic Tricks and Fun Stix"))
    db.session.add(Channel(type="ch", title="marketing"))
    db.session.commit()


def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
