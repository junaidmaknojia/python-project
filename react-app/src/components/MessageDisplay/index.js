import React, { useState, useEffect } from "react";
import EmojiModal from "../EmojiModal";
import Reactions from "../Reactions";
import DOMPurify from 'dompurify';
import styles from './MessageDisplay.module.css';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg'
import { convertFromHTML, convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useSelector } from "react-redux";
import { socket } from '../GlobalChat';

const MessageDisplay = ({message, socket, channel, editting, setEditting }) => {
    const currentUser = useSelector(state => state.session.user)
    const [ currentMessage, setCurrentMessage ] = useState(message);
    const [ emojis, setEmojis ] = useState([])
    const [ isUser, setIsUser ] = useState(currentUser.id !== message.user.id)
    const [ isSuper, setIsSuper ] = useState(currentUser.username == 'super')
    const [ show, setShow ] = useState(false);
    const [ isEdit, setIsEdit ] = useState(false);
    const [convertedContent, setConvertedContent] = useState(message.body);
    const [ newMessage, setNewMessage ] = useState(message.body);
    const [ editorState, setEditorState ] = useState(
        () => EditorState.createWithContent(convertFromHTML(message.body)),      )


    useEffect(() => {
        setEmojis([...message.reactions])
    }, [message])

    // for the text editor
    const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(currentContentAsHTML);
      }

    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
      }


    const formattedTime = () => {
        let date = new Date(message.created_at)
        let hours = date.getHours()
        let minutes = date.getMinutes()
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours: 12
        minutes = minutes < 10 ? '0' + minutes: minutes;
        return `${hours}:${minutes} ${ampm}`
    }



    const showModal = () => {
        setShow(true);
      }


    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }

    const showEdit = () => {
        if(!editting) {
        setEditting(true);
        setIsEdit(true);
        }
    }

    const cancelEdit = () => {
        setIsEdit(false);
        setEditting(false);
    }

    const deleteMsg = () => {
        socket.emit("message", {
            id: message.id,
            type: 'delete',
            room: channel.id
        });
    }

    const handleChange = (e) => {
        setNewMessage(convertedContent)
    }

    const handleEdit = () => {
        if (newMessage) {
            socket.emit("message", {
                body: newMessage,
                id: message.id,
                type: 'edit',
                room: channel.id
            });
            setIsEdit(false);
        }
    }

    return (
        <div className={isEdit?styles.edit_wrapper:styles.message_wrapper}>
            <div className={styles.menuWrapper} >
                <button className={styles.emoji} onClick={showModal}><i className="far fa-grin fa-2x"></i></button>
                <button disabled={isSuper?false:isUser} className={styles.edit} onClick={showEdit}><i className="fas fa-edit fa-2x"></i></button>
                <button disabled={isSuper?false:isUser} className={styles.delete} onClick={deleteMsg}><i className="fas fa-trash-alt fa-2x"></i></button>
            </div>
            <EmojiModal show={show} setShow={setShow} message={message}/>
            <div className={styles.message_container}>
                <div className={styles.author_image}>
                    {message.user && <img className={styles.author_avatar} src={message.user.picture_url} />}
                </div>
                <div className={styles.text_container}>
                    {!isEdit && [<span className={styles.author_name}>
                        {message.user.username}
                    </span>,

                    <span className={styles.message_timestamp}>
                        {formattedTime()}
                    </span>]}

                    <div className={styles.message_body}>
                        {isEdit?
                        [<Editor editorState={editorState}
                        onEditorStateChange={handleEditorChange}
                        wrapperClassName={styles.wrapperClass}
                        editorClassName={styles.editorClass}
                        toolbarClassName={styles.toolbarClass}
                        value={newMessage}
                        onChange={handleChange}
                        />,
                        <button className={styles.cancel} onClick={cancelEdit}>Cancel</button>,
                        <button
                            className={styles.save}
                            disabled={newMessage === message.body}
                            onClick={handleEdit}>
                            <span className={styles.arrow} ><i className={`fas fa-level-down-alt`}></i></span>
                            Save Changes
                        </button>]:
                        <pre
                            className={styles.richText}
                            dangerouslySetInnerHTML={createMarkup(message.body)}
                        >
                        </pre>}
                    </div>
                    <div className="amIhere">
                        <span>
                            {!isEdit && <Reactions message={message} setEmojis={setEmojis} emojis={emojis} />}
                        </span>
                    </div>

                </div>
            </div>
        </div>
    )

}

export default MessageDisplay;
