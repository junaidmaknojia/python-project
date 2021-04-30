import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import MessageDisplay from '../MessageDisplay';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg'
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from './GlobalChat.module.css';

// need user instance (info: url, name)

const endPoint = "http://localhost:3000/";

export const socket = io(endPoint);

const GlobalChat = ({ pastMessages }) => {
  const user = useSelector(state => state.session.user);
  const currentChannel = useSelector(state => state.channels.current)
  const channel_id = currentChannel.id
  const [ messages, setMessages ] = useState([]);
  const [ newMessage, setNewMessage ] = useState('');
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  )
  const [convertedContent, setConvertedContent] = useState(null);
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  }
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  }

  socket.on("message", data => {
    setMessages([data, ...messages]);
  });

  const sendMessage = () => {
    if (newMessage) {
      socket.emit("message", {
        body: newMessage,
        room: channel_id,
        user_id: user.id,
        created_at: new Date(),
        user: {
          username: user.username,
          picture_url: user.picture_url
        }
      });
      setEditorState()
      setNewMessage('')
    } else {
      alert("your dumb");
    }
  }

  useEffect(() => {
    socket.emit("join_room", {user_id: user.id, room:channel_id})
    setMessages([...pastMessages])
  }, [pastMessages])


  return (
    <div className={styles.mainWrapper}>
      <div className={styles.messageWrapper}>
      {messages.length > 0 &&
        messages.map((data, i) => (
          <MessageDisplay message={data} key={i} />
          ))}
      </div>
      <div className={styles.sendMessageBar}>
        {/* <textarea placeholder={`Message ${currentChannel.title}`} value={newMessage} className={styles.writeTextBox} 
        name="message" onChange={e => setNewMessage(e.target.value)}/> */}
      <div className={styles.textEditorDiv}>
        <button className={styles.sendMessageButton} onClick={sendMessage}>=></button>
        <Editor editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName={styles.wrapperClass}
        editorClassName={styles.editorClass}
        toolbarClassName={styles.toolbarClass}
        value={newMessage} 
        placeholder={`   Message ${currentChannel.title}`} 
        onChange={e => setNewMessage(convertedContent)}
        />
      </div>
      </div>
    </div>
  )
}

export default GlobalChat;
