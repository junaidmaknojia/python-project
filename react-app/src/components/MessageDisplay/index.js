import React, { useState, useEffect } from "react";
import styles from './MessageDisplay.module.CSS';

const MessageDisplay = ({message}) => {
    const date = new Date(message.created_at)

    return (
        <div className={styles.message_wrapper}>
            <div className={styles.message_container}>
                <div className={styles.author_image}>
                    {message.user && <img src={message.user.picture_url} />}
                </div>
                <div className={styles.text_container}>
                    <span className={styles.author_name}>
                        {message.user.username}
                    </span>
                    <span className={styles.message_timestamp}>
                        {date.getTime()}
                    </span>
                    <div className={styles.message_body}>
                        <pre className={styles.message_body__text}>{message.body}</pre>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default MessageDisplay;
