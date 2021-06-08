import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import MessageDisplay from '../MessageDisplay';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg'
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from './GlobalChat.module.css';
import { useDevs } from "../../context/DevsProvider";
import DevModal from '../DevModal';


// const endPoint = "https://sn4ck.herokuapp.com/";
const endPoint = "http://localhost:5000";

export const socket = io(endPoint);


const GlobalChat = ({ pastMessages }) => {
  const user = useSelector(state => state.session.user);
  const currentChannel = useSelector(state => state.channels.current)
  const emoji = useSelector(state => state.emoji.emoji)

  const channel_id = currentChannel.id
  const { showDevs } = useDevs();
  const [ messages, setMessages ] = useState([]);
  const [ editting, setEditting ] = useState(false);
  const [ messagesLoaded, setMessagesLoaded ] = useState(false);
  const [ returnNew, setReturnNew ] = useState('');
  const [ returnEdit, setReturnEdit ] = useState('');
  const [ returnDelete, setReturnDelete ] = useState('');
  const [ returnReaction, setReturnReaction ] = useState('');
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

  // useEffect(() => {
  //   console.log("mounted")
  // })

  useEffect(() => {
    if (!messages) return;
    setMessagesLoaded(true);
  }, [messages])

  // this sets the messages when a new message is created
  useEffect(() => {
    setMessages([returnNew, ...messages])
  }, [returnNew])

  // this sets the messages when an existing message is edited
  useEffect(() => {

    const messageArr = messages.map(message => {
      if (returnEdit.id === message.id) {
        return returnEdit;
      } else {
        return message;
      }
    })
    setMessages(messageArr);

  }, [returnEdit])

  // this sets the messages when an existing message is deleted
  useEffect(() => {

    const deleteArr = messages.filter(message => {
      return returnDelete?.id !== message.id
    })

    setMessages(deleteArr);
  }, [returnDelete])

  // this sets the messages for reactions
  useEffect(() => {

    const messageArr = messages.map(message => {
      if (returnReaction.id === message.id) {
        return returnReaction;
      } else {
        return message;
      }
    })
    setMessages(messageArr);
  }, [returnReaction])


  useEffect(() => {
    if (!messagesLoaded) return;

    socket.on("message", data => {
      switch (data.type) {
        case 'new':
          setReturnNew(data);
          break;
        case 'edit':
          setReturnEdit(data);
          break;
        case 'delete':
          setReturnDelete(data);
          break;
        default:
          console.log("Hit the default");
      }
    });

    socket.on("reactionsBack", data => {
      setReturnReaction(data);
    })

  }, [messagesLoaded])


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
          {showDevs && <DevModal />}
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
