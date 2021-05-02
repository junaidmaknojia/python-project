import React from "react";
import Picker from "emoji-picker-react";
import { overlay, main } from "./EmojiModal.module.css";
import { useSelector } from 'react-redux';
import { socket } from "../GlobalChat";


const EmojiModal = ({ show, setShow, message }) => {
  const room = useSelector(state => state.channels.current)
  const user = useSelector(state => state.session.user)
  const hideModal = () => {
    setShow(false)  }


  const onEmojiClick = (event, emojiObject) => {
    const data = {
      type: emojiObject.emoji,
      message_id: message.id,
      user_id: user.id,
      room: room.id
    }
    socket.emit("reactions", data)
  }

  if (!show) return null;

  return (
    <div className={overlay} onClick={hideModal}>
      <div className={main}>
        <Picker onEmojiClick={onEmojiClick}/>
      </div>
    </div>
  )
}

export default EmojiModal;
