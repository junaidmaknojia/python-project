import React, { useState, useEffect } from "react";
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
                    <span className={styles.message_timestamp}>
                        {formattedTime()}
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
