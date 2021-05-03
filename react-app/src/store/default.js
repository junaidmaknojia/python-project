// constants
const SET_GLOBAL = "default/SET_DEFAULT"


export const setGlbl = (id) => ({
  type: SET_GLOBAL,
  payload: id
})


//thunks
export const getGlobal = () => async (dispatch) => {
  const response = await fetch('/api/glbl', {
		headers: { 'Content-type': 'application/json' }
	});

  const channel = await response.json();
  dispatch(setGlbl(channel.id));
  return channel.id;
}

//reducer
const initialState = {id: null}
export default function defautlReducer(state=initialState, action) {
  switch (action.type) {
    case SET_GLOBAL:
      return { id: action.payload }
    default:
      return state;
  }
}
