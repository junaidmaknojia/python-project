import React, { useState, useEffect } from "react";
import DOMPurify from 'dompurify';
import styles from './MessageDisplay.module.css';

const MessageDisplay = ({message}) => {
    const date = new Date(message.created_at)
    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }

    return (
        <div className={styles.message_wrapper}>
            <div className={styles.message_container}>
                <div className={styles.author_image}>
                    {message.user && <img className={styles.author_avatar} src={message.user.picture_url} />}
                </div>
                <div className={styles.text_container}>
                    <span className={styles.author_name}>
                        {message.user.username}
                    </span>
                    <span className={styles.message_timestamp}
                    >
                        {date.getTime()}
                    </span>
                    {/* <div className={styles.message_body}>
                        <pre className={styles.message_body__text}
                        ><p>{message.body}</p></pre>
                        </div> */}
                    <div>
                    <pre
                    dangerouslySetInnerHTML={createMarkup(message.body)}
                    >
                    </pre>

                    </div>
                </div>
            </div>
        </div>
    )

}

export default MessageDisplay;
