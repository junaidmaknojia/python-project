import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { main } from "./Reactions.module.css";

const Reactions = ({reactions, messageId}) => {
 const messageReactions = useSelector(state => state.emoji.reactions)
 const [ mounted, setMounted ] = useState(false);

 useEffect(() => {
   if (!messageReactions) return

   if (messageReactions[0].message_id === messageId) {
     setMounted(true)
   }

 }, [messageReactions])

  return (
    <div className={main}>
      {!mounted && reactions.map((reaction, i) => (
        <div key={i}>
          <span key={reaction}>{reaction.type}</span>
        </div>
      ))}
      {(mounted && messageReactions) && messageReactions.map((reaction, i) => (
        <div key={i}>
          <span key={reaction}>{reaction.type}</span>
        </div>
      ))}
    </div>
  )
}

export default Reactions;
