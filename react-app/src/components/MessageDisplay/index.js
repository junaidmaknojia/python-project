import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import EmojiModal from "../EmojiModal";
import Reactions from "../Reactions";
import DOMPurify from 'dompurify';
import styles from './MessageDisplay.module.css';
import { socket } from "../GlobalChat";

const MessageDisplay = ({message}) => {
    const [ emojis, setEmojis ] = useState([])
    const [ show, setShow ] = useState(false);

    useEffect(() => {
        setEmojis([...message.reactions])
    }, [])


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

    return (
        <div className={styles.message_wrapper}>
            <div className={styles.menuWrapper} >
                <button className={"emoji"} onClick={showModal}>emoji</button>
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
                    <pre
                    dangerouslySetInnerHTML={createMarkup(message.body)}
                    >
                    </pre>

                    </div>
                    <div className="amIhere">
                        <span>
                            <Reactions message={message} setEmojis={setEmojis} emojis={emojis} />
                        </span>
                    </div>

                </div>
            </div>
        </div>
    )

}

export default MessageDisplay;
