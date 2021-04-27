import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import MessageDisplay from '../MessageDisplay';

// need user instance (info: url, name)

const endPoint = "http://localhost:5000";

const socket = io(endPoint);

const GlobalChat = () => {
  const user = useSelector(state => state.session.user);
  const [ messages, setMessages ] = useState([]);
  const [ newMessage, setNewMessage ] = useState('');

  const channel = {
    id: 1,
    messages: []
  }

  socket.on("message", data => {
    console.log("inside socket.on", data)
    setMessages([...messages, data]);
  });

  const sendMessage = () => {
    if (newMessage) {
      socket.emit("message", {
        // name: user.username, // refacter to match our user
        body: newMessage,
        room: channel.id,
        user_id: user.id,
        created_at: new Date(),
        user: {
          username: user.username,
          picture_url: user.picture_url
        }
      });
      setNewMessage('')
    } else {
      alert("your dumb");
    }
  }

  useEffect(() => {
    socket.emit("join_room", {user_id: user.id, room:channel.id})
    // setMessages([...channel.messages])
  }, [])


  return (
    <div>
      {messages.length > 0 &&
        messages.map((data, i) => (
          <MessageDisplay message={data} key={i} />
        ))}
      <input value={newMessage} name="message" onChange={e => setNewMessage(e.target.value)}/>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  )
}

export default GlobalChat;
