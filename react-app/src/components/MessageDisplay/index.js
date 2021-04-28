import React, { useState, useEffect } from "react";
import styles from './MessageDisplay.module.CSS';

const MessageDisplay = ({message}) => {
    const date = new Date(message.created_at)

    return (
        <div className="message_wrapper">
            <div className="message_container">
                <div className="author_image">
                    {message.user && <img src={message.user.picture_url} />}
                </div>
                <div className="text_container">
                    <span className="author_name">
                        {message.user.username}
                    </span>
                    <span className="message_timestamp">
                        {date.getTime()}
                    </span>
                    <div className="message_body">
                        <pre className="message_body__text">{message.body}</pre>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default MessageDisplay;
