import React, {useEffect, useState } from "react";
import {useSelector} from "react-redux";
import io from "socket.io-client";

// need user instance (info: url, name)

const endPoint = "http://localhost:5000";

const socket = io(endPoint);

const GlobalChat = () => {
  const user = useSelector(state => state.session.user);
  const [ messages, setMessages ] = useState([{
    name: "start", body: "start messeges"
  }]);
  const [ newMessage, setNewMessage ] = useState('');

  socket.on("message", data => {
    console.log("inside socket.on", data)
    setMessages([...messages, data]);
  });

  const sendMessage = () => {
    if (newMessage) {
      socket.emit("message", {
        name: user.username, // refacter to match our user
        body: newMessage
      });
      setNewMessage('')
    } else {
      alert("your dumb");
    }
  }

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
