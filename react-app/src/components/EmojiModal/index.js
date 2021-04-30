import React, {useEffect, useState} from "react";
import Picker from "emoji-picker-react";
import { overlay, main } from "./EmojiModal.module.css";
import { setEmoji } from '../../store/emoji';
import { useDispatch } from 'react-redux';

const EmojiModal = ({ show, setShow }) => {
  const dispatch = useDispatch()
  const hideModal = () => {
    setShow(false)
  }


  const onEmojiClick = (event, emojiObject) => {
    dispatch(setEmoji(emojiObject.emoji))
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
