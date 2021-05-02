import React from "react";
import { useSelector } from "react-redux";
import { main, emojiWrapper } from "./Reactions.module.css";

import { socket } from '../GlobalChat';

const Reactions = ({message, emojis, setEmojis}) => {

 const channel = useSelector(state => state.channels.current)

 socket.on("reactionsBack", data => {

     if (message.channel_id === channel.id) {
     setEmojis([...emojis, data])
     }
 })



  return (
    <div className={main}>
      <div className={emojiWrapper}>
      {emojis.length > 0  && emojis.map((reaction, i) => {
        if (reaction.message_id === message.id) {
          return (
            <div key={i}>
              <span key={reaction}>{reaction.type}</span>
            </div>
          )
        }
      })}
      </div>
    </div>
  )
}

export default Reactions;
