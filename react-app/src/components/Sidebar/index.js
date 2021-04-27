import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import { makeChannel, userChannels } from '../../store/channels';
import "./Sidebar.css";

const endPoint = "http://localhost:5000";
const socket = io(endPoint);

export default function Sidebar(){
    const history = useHistory();
    const channelId = useParams();
    const dispatch = useDispatch();

    const [newChannel, setNewChannel] = useState();
    const user = useSelector(state => state.session.user);
    const myChannels = useSelector(state => state.channels.channels);
    const currChannel = myChannels ? myChannels.find(channel => channel.id === channelId) : {};

    useEffect(() => {
        dispatch(userChannels())
    }, [dispatch])

    // function createChannel(e){
    //     // show modal or page to create a channel
    //     return (
    //         <div>
    //             <form onSubmit={submitNewChannel}>
    //                 <input
    //                     placeholder="Channel Name"
    //                     value={newChannel}
    //                     onChange={e => setNewChannel(e.target.value)}
    //                     type="text"
    //                 />
    //             </form>
    //         </div>
    //     )
    // }

    async function submitNewChannel(e){
        e.preventDefault();
        const submitChannel = {title: newChannel, type: "ch", user_id: user.id};
        const freshChannel = await dispatch(makeChannel(submitChannel));
        // socket.emit("leave_room", {name: user.username, room: currChannel.title}) #this needs to be commented in when we have routes working
        socket.emit("join_room", {name: user.username, room: freshChannel.title})
        history.push(`/channels/${freshChannel.id}`)
    }

    async function channelClick(e){
        const clickedChannelId = e.target.id;
        if(currChannel.id !== clickedChannelId){
            socket.emit("leave_room", {name: user.username, room: currChannel.title})
            socket.emit("join_room", {name: user.username, room: clickedChannelId.title})
            history.push(`/channels/${clickedChannelId}`);
        }
    }

    return (
        <div className="sideBar">
            <div className="sectionTitles">
            </div>
            <div className="channels">
                <p>Channels</p>
                <div>
                <form onSubmit={submitNewChannel}>
                    <input
                        placeholder="Channel Name"
                        value={newChannel}
                        onChange={e => setNewChannel(e.target.value)}
                        type="text"
                    />
                    <button type="submit">+</button>
                </form>
                </div>
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
