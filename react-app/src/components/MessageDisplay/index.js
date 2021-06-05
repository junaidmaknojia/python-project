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

const MessageDisplay = ({message, socket, channel}) => {
    const currentUser = useSelector(state => state.session.user)
    const [ emojis, setEmojis ] = useState([])
    const [ isUser, setIsUser ] = useState(currentUser.id !== message.user.id)
    const [ show, setShow ] = useState(false);
    const [ isEdit, setIsEdit ] = useState(false);
    const [convertedContent, setConvertedContent] = useState(message.body);
    const [ newMessage, setNewMessage ] = useState(message.body);
    const [editorState, setEditorState] = useState(
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
        setIsEdit(true);
        console.log(newMessage, 'newmessage')
    }

    const cancelEdit = () => {
        setIsEdit(false);
    }

    const deleteMsg = () => {
        return;
    }

    const handleChange = (e) => {
        setNewMessage(convertedContent)
    }

    const handleEdit = () => {
        if (newMessage) {
            socket.emit("message", {
                body: newMessage,
                id: message.id,
                new: false,
                room: channel.id
            });
            setIsEdit(false);
        }
    }

    return (
        <div className={styles.message_wrapper}>
            <div className={styles.menuWrapper} >
                <button className={styles.emoji} onClick={showModal}><i className="far fa-grin fa-2x"></i></button>
                <button disabled={isUser} className={styles.edit} onClick={showEdit}>edit</button>
                <button disabled={isUser} className={styles.delete} onClick={deleteMsg}>delete</button>
            </div>
            <EmojiModal show={show} setShow={setShow} message={message}/>
            <div className={styles.message_container}>
                <div className={styles.author_image}>
                    {message.user && <img className={styles.author_avatar} src={message.user.picture_url} />}
                </div>
                <div className={styles.text_container}>
                    <span className={styles.author_name}>
                        {message.user.username}
                    </span>

                    <span className={styles.message_timestamp}>
                        {formattedTime()}
                    </span>

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
                        <button onClick={cancelEdit}>cancel</button>,
                        <button disabled={newMessage === message.body} onClick={handleEdit}>edit messge</button>]:
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
