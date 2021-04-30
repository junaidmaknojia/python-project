
//constants
const SET_EMOJI = "emoji/SET_EMOJI";


export const setEmoji = (emoji) => ({
  type: SET_EMOJI,
  payload: emoji
})

//reducer
const initialState=''
export default function emojiReducer(state=initialState, action) {
  switch (action.type) {
    case SET_EMOJI:
      return {...state, emoji: action.payload };
    default:
      return state;
  }
}
