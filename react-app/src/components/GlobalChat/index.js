import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";

// need user instance (info: url, name)

const endPoint = "http://localhost:5000";

const socket = io(endPoint);

const GlobalChat = () => {
  const user = useSelector(state => state.session.user);
  const [ messages, setMessages ] = useState([{
    name: "start", body: "start messages"
  }]);
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
        name: user.username, // refacter to match our user
        body: newMessage,
        room: channel.id,
        user_id: user.id
      });
      setNewMessage('')
    } else {
      alert("your dumb");
    }
  }

  useEffect(() => {
    socket.emit("join_room", {name: user.username, room:channel.id})
    // setMessages([...channel.messages])
  }, [])


  return (
    <div>
      {messages.length > 0 &&
        messages.map(data => (
          <div key={data.body + Math.random()}>
            <h1>{data.name}</h1>
            <p>{data.body}</p>
          </div>
        ))}
      <input value={newMessage} name="message" onChange={e => setNewMessage(e.target.value)}/>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  )
}

export default GlobalChat;
