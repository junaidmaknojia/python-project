// constants
const GET_CHANNELS = "channels/GET_CHANNELS";
const ADD_CHANNEL = "channels/ADD_CHANNEL";


export const getChannels = (channels) => ({
	type: GET_CHANNELS,
	payload: channels
})

export const addChannel = (channel) => ({
	type: ADD_CHANNEL,
	payload: channel
})


//thunks
export const userChannels = () => async (dispatch) => {
	const response = await fetch('/api/channel', {
		headers: { 'Content-type': 'application/json' }
	});

	const channel = await response.json();
	console.log(channel);
	dispatch(getChannels(channel));
	return channel
}

export const makeChannel = (channel) => async (dispatch) => {
	const response = await fetch('/api/channel', {
		method: 'POST',
		headers: { 'Content-type': 'application/json' },
		body: JSON.stringify(channel)
	})

	const data = await response.json();
	dispatch(addChannel(data));
	return data;
}

export const currentChannel = () => async (dispatch) => {
	const response = await fetch('/api/channel/current', {
		headers: { 'Content-type': 'application/json' }
	});
	const channel = response.json();
	dispatch(addChannel(channel));
	return channel
}

//grab all channels

export const listChannels = async () => {
	const response = await fetch('/api/channel/all', {
		headers: { "Content-type": "application/json" }
	})

	const allChannels = await response.json();
	console.log(allChannels, "from listChannels hsrere")
	return allChannels;
}


export const joinChannel = (payload) => async (dispatch) => {
	// payload = {channelId: tempId, user_id: user.id}
	const response = await fetch("/api/channel/join", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	const joinedChannel = await response.json();
}

export const createDM = (payload) => async (dispatch) => {
	// payload = {otherUserId: tempId, user_id: user.id}
	const response = await fetch("/api/channel/dm", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	const newDM = await response.json();
}

// reducer

const initialState = {}

// useSelector(state => state.channels.channels)

export default function channelReducer(state = initialState, action) {
	switch (action.type) {
		case GET_CHANNELS:
			return { ...state, channels: action.payload };
		case ADD_CHANNEL:
			return { ...state, current: action.payload };
		default:
			return state;
	}
}
