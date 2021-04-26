# from flask_socketio import send, emit, join_room, leave_room
# from app import socketio

# @socketio.on("connect")
# def handle_connect():
#     print("client connected")

# @socketio.on("message")
# def handleMessage(data):
#     print(data)
#     room = data["room"]
#     send(data, room=room, broadcast=True)
#     return None

# @socketio.on("join_room")
# def on_join(data):
#   print(f'{data["name"]} has joined {data["room"]}')
#   room = data["room"]
#   join_room(room)

# @socketio.on("leave_room")
# def on_leave(data):
#   print(f'{data["name"]} has left the building')
#   room = data["room"]
#   leave_room(room)
