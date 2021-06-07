# from werkzeug.security import generate_password_hash
from app.models import db, User, user, Channel
import os


# Adds a demo user, you can add other users here if you want
def seed_users():
    password_append = os.environ.get("PASSWORD_APPEND")
    demo = User(username='Demo', first_name='demo', last_name='user', email='demo@aa.io',
                password='password')
    db.session.add(demo)
    db.session.add(User(username='noRespect', first_name='Rodney', last_name='DangerField', email='dangerfield@gmail.com', password=f'DangerField{password_append}'))
    db.session.add(User(username='homes11', first_name='John', last_name='Homes', email='homes@gmail.com', password=f'Homes{password_append}'))
    db.session.add(User(username='serenity95', first_name='Frank', last_name='Costanza', email='constanza@gmail.com', password=f'Costanza{password_append}'))
    db.session.add(User(username='rDone&Dunn', first_name='Ron', last_name='Dunn', email='dunn@gmail.com', password=f'Dunn{password_append}'))
    db.session.add(User(username='drGrant1982', first_name='Alan', last_name='Grant', email='grant@gmail.com', password=f'Grant{password_append}'))
    db.session.add(User(username='debbierice', first_name='Debbie', last_name='Rice', email='rice@gmail.com', password=f'Rice{password_append}'))
    db.session.add(User(username='singingDoo', first_name='Dum', last_name='Diddy-Doo', email='diddydoo@gmail.com', password=f'Diddy-Doo{password_append}'))
    db.session.add(User(username='Dr.X', first_name='Theodore', last_name='Westside', email='westside@gmail.com', password=f'Westside{password_append}'))
    db.session.add(User(username='totagino15oh', first_name='Gino', last_name='Totagino', email='totagino@gmail.com', password=f'Totagino{password_append}'))
    db.session.add(User(username='woooow', first_name='Oh-wowen', last_name='Wilson', email='wilson@gmail.com', password=f'Wilson{password_append}'))
    db.session.add(User(username='bedelia-aa', first_name='Celia', last_name='Bedelia', email='bedelia@gmail.com', password=f'Bedelia{password_append}'))
    db.session.add(User(username='abernath30', first_name='Dumbo', last_name='Abernathy', email='abernathy@gmail.com', password=f'Abernathy{password_append}'))
    db.session.add(User(username='newUser', first_name='Stephanorupenstilkic', last_name='Upenheismanschanditz', email='upenheismanschanditz@gmail.com', password=f'Upenheismanschanditz{password_append}'))
    db.session.add(User(username='wu1990', first_name='Dylan', last_name='Wu', email='wu@gmail.com', password=f'wu{password_append}'))

    db.session.commit()

    for x in range(len(User.query.all())):
        user = User.query.get(x + 1)
        for y in range(len(Channel.query.all()) - 2):
            channel = Channel.query.get(y + 1)
            channel.users.append(user)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
