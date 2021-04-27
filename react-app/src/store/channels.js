// constants
const GET_CHANNELS = "channels/GET_CHANNELS";
const ADD_CHANNEL = "channels/ADD_CHANNEL";


const getChannels = (channels) => ({
  type: GET_CHANNELS,
  payload: channels
})

const addChannel = (channel) => ({
  type: ADD_CHANNEL,
  payload: channel
})


//thunks
export const userChannels = () => async (dispatch) => {
  const response = await fetch ('api/channel/', {
    headers: { 'Content-type': 'application/json'}
  });

  const channels = await response.json();
  dispatch(getChannels(channels));
}

export const makeChannel = (channel) => async (dispatch) => {
  const response = await fetch ('api/channel/', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(channel)
  })

  const data = await response.json();
  dispatch(addChannel(data));
}

// reducer

const initialState = { channels: null, current: null };

// useSelector(state => state.channels.channels)

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHANNELS:
      return { ...state, channels: action.payload };
    case ADD_CHANNEL:
      return { ...state, current: action.payload };
    default:
      return state;
  }
}
