# Sn4ck

This clone of Slack includes all the same features including live chatting in channels and group DMs along with emojis for reactions a rich text editor for personalized messages. Give it a try at the live link:

http://sn4ck.herokuapp.com/

## Tech Stack
   - NodeJS
   - React/Redux
   - Python
   - Flask / SQLAlchemy
   - PostgreSQL
   - AWS
   - WebSockets - SocketIO

## Features
   - Live chat
   - Create channels
   - Create group and 1-1 DMs
   - Join/Leave channels
   - Customize messages with rich text editor
   - React to messages with emojis
   - Upload your own profile photo

## Site Walk-through

### Splashpage
![splashpage](https://user-images.githubusercontent.com/74396674/121299586-44953200-c8bb-11eb-8ae4-5280124d58e4.PNG)

### Global/Channel Chat
New and returning users are added/directed to the global chatroom which serves as a lobby for all users on the platform. Users can then hop from one room to another through the channels bar on the left. Each chat room has a text field to send a message using a rich text editor with the react-draft-wysiwyg library and can include emojis as well along with reacting to other messages with an emoji.
![global-chat](https://user-images.githubusercontent.com/74396674/121299718-760dfd80-c8bb-11eb-9cf2-2c65fb9e34eb.PNG)


### Channel Join/Leave
Users can click on the + next to Channels and see a list of all channels created in sn4ck along with a submission for a new channel. The UI to join/leave are updated based on the user's input and the list on the left panel updates dynamically from the input.
![channels](https://user-images.githubusercontent.com/74396674/121299748-81f9bf80-c8bb-11eb-8e60-9d91eb806f00.PNG)


### Creating Group DMs
Users can also create group messages with as many people they'd like from the list of users on sn4ck. Clicking the "add" next the user's name adds them to the list that once submitted either creates a new group chat or redirects to the existing group chat with the same combination of users. The name and symbol of the chat reflects the Slack UI accurately.
![groupDMs](https://user-images.githubusercontent.com/74396674/121299778-8a51fa80-c8bb-11eb-98fa-e2bea01c1acf.PNG)


## Further Documentation
https://github.com/junaidmaknojia/sn4ck/wiki

### Media Credits
   - Images: Unsplash
   - Splashpage Design: Slack
   - Logo: FontAwesome
