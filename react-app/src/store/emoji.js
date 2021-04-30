
//constants
const SET_EMOJI = "emoji/SET_EMOJI";
const SET_REACTION = "emoji/SET_REACTION";

export const setEmoji = (emoji) => ({
  type: SET_EMOJI,
  payload: emoji
})

export const setReaction = (emojis) => ({
  type: SET_REACTION,
  payload: emojis
})

// thunks
export const reactionThunk = (messageId, emoji) => async (dispatch) => {
  const response = await fetch('/api/reaction', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({messageId, emoji})
  })

  const data = await response.json();
  dispatch(setReaction(data.reactions));
}

//reducer
const initialState=''
export default function emojiReducer(state=initialState, action) {
  switch (action.type) {
    case SET_EMOJI:
      return {...state, emoji: action.payload };
    case SET_REACTION:
      return { ...state, reactions: action.payload };
    default:
      return state;
  }
}
