import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import MessageDisplay from '../MessageDisplay';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg'
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from './GlobalChat.module.css';


// const endPoint = "https://sn4ck.herokuapp.com/";
const endPoint = "http://localhost:5000";

export const socket = io(endPoint);


const GlobalChat = ({ pastMessages }) => {
  const user = useSelector(state => state.session.user);
  const currentChannel = useSelector(state => state.channels.current)
  const emoji = useSelector(state => state.emoji.emoji)

  const channel_id = currentChannel.id
  const [ messages, setMessages ] = useState([]);
  const [ editting, setEditting ] = useState(false);
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

  useEffect(() => {
    console.log("mounted")
  })

  socket.on("message", data => {
      switch (data.type) {
        case 'new':
          console.log('ran this many times')
          setMessages([data, ...messages]);
          break;
        case 'edit':
          const messageArr = messages.map(message => {
            if (data.id === message.id) {
              return data;
            } else {
              return message;
            }
          })
          setMessages(messageArr);
          break;
        case 'delete':
          const deleteArr = messages.filter(message => {
            return data.id !== message.id
          })
          setMessages(deleteArr);
          break;
        default:
          console.log("Hit the default");
    }
  });

  socket.on("reactionsBack", data => {

    const messageArr = messages.map(message => {
      if (data.id === message.id) {
        return data;
      } else {
        return message;
      }
    })
    setMessages(messageArr);

    // if (message.channel_id === channel.id && message.id === data.id) {
    // setCurrentMessage(data)
    // }
})


  const sendMessage = () => {
    if (newMessage) {
      socket.emit("message", {
        type: 'new',
        body: newMessage,
        room: channel_id,
        user_id: user.id,
        created_at: new Date(),
        user: {
          username: user.username,
          picture_url: user.picture_url
        },
        reactions: [],
        msg: ""
      });
      setEditorState(() => EditorState.createEmpty())
      setNewMessage('')
    } else {
      alert("message field cannot be empty");
    }
  }

  useEffect(() => {
    // console.log(user.id, "user Id in useEffect Global")
    socket.emit("join_room", {name: user.id, room:channel_id})
    setMessages([...pastMessages])
  }, [pastMessages])



  return (
    <div className={styles.mainWrapper}>
      <div className={styles.messageWrapper}>
      {messages.length > 0 &&
        messages.map((data, i) => (
          <MessageDisplay
            editting={editting}
            setEditting={setEditting}
            message={data}
            key={i}
            socket={socket}
            channel={currentChannel} />
          ))}
      </div>
      <div className={styles.flexrow}>
      <div className={styles.flexWrapper}>
        <div className={styles.textEditorDiv}>
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
        <div className={styles.fakeInputDiv}>
          <div className={styles.emptyDiv}>
          </div>
          <div className={styles.buttonCenter}>
            <button className={styles.sendMessageButton} disabled={!newMessage.length || newMessage == '<p></p>'}
            onClick={sendMessage}><i className="fas fa-paper-plane"></i></button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default GlobalChat;
