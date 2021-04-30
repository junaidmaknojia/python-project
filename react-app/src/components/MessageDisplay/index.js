import React, { useState, useEffect } from "react";
import EmojiModal from "../EmojiModal";
import Reactions from "../Reactions";
import DOMPurify from 'dompurify';
import styles from './MessageDisplay.module.css';

const MessageDisplay = ({message}) => {


    const formattedTime = () => {
        let date = new Date(message.created_at)
        let hours = date.getHours()
        let minutes = date.getMinutes()
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours: 12
        minutes = minutes < 10 ? '0' + minutes: minutes;
        return `${hours}:${minutes} ${ampm}`

    const [ show, setShow ] = useState(false);

    const showModal = () => {
        setShow(true);
      }

    // <span>{newEmoji?newEmoji.emoji:''}</span>
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

                    </span>

                    <div className={styles.message_body}>
                    <pre
                    dangerouslySetInnerHTML={createMarkup(message.body)}
                    >
                    </pre>

                    </div>
                    {message.reactions.length > 0 && ([
                        <span>
                            <Reactions reactions={message.reactions} messageId={message.id}/>
                        </span>
                    ])}
                </div>
            </div>
        </div>
    )

}

export default MessageDisplay;
