import React from "react";
import {useParams} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import io from "socket.io-client";

const endPoint = "http://localhost:5000";
const socket = io(endPoint);

export default function Sidebar(){
    const channelId = useParams();
    const dispatch = useDispatch();

    const [newChannel, setNewChannel] = useState();
    const user = useSelector(state => state.session.user);
    const myChannels = useSelector(state => state.channels.channels);
    const currChannel = myChannels.find(channel => channel.id === channelId);

    function createChannel(e){
        // show modal or page to create a channel
        return (
            <>
                <form onSubmit={submitNewChannel}>
                    <input
                        placeholder="Channel Name"
                        value={newChannel}
                        onChange={e => setNewChannel(e.target.value)}
                        type="text"
                    />
                </form>
            </>
        )
    }

    async function submitNewChannel(e){
        e.preventDefault();
        const submitChannel = {title: newChannel, type: "ch", user_id: user.id};
        const freshChannel = await dispatch(makeChannel(submitChannel));
        socket.emit("leave_room", {name: user.username, room: currChannel.title})
        socket.emit("join_room", {name: user.username, room: freshChannel.title})
        // redirect/reload chat component to show new room
    }

    async function channelClick(e){
        const clickedChannel = e.target.id;
        if(currChannel.id !== clickedChannel){
            socket.emit("leave_room", {name: user.username, room: currChannel.title})
            socket.emit("join_room", {name: user.username, room: clickedChannel.title})
            // redirect/reload chat component to show new room
        }
    }

    return (
        <div className="sideBar">
            <div className="sectionTitles">
            </div>
            <div className="channels">
                <p>Channels</p>
                <button onClick={createChannel}>+</button>
                {myChannels && (
                    myChannels.map(channel => (
                        <div key={channel.id}
                            id={channel.id}
                            className="channel__title"
                            onClick={channelClick}>
                            {channel.title}
                        </div>
                    ))
                )}
            </div>
            <div className="directMessages">

            </div>
        </div>
    )
}
