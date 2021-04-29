import React, {useEffect, useState} from "react";
import Picker from "emoji-picker-react";
import { overlay, main } from "./EmojiModal.module.css";

const EmojiModal = ({ show, setShow }) => {
  const [ emoji, setEmoji ] = useState(null)

  const hideModal = () => {
    setShow(false)
  }

  useEffect(() => {
    console.log(typeof(emoji?.emoji), "emoji in modal!!!!!!!!!!")
  }, [emoji])

  const onEmojiClick = (event, emojiObject) => {
    setEmoji(emojiObject)
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
