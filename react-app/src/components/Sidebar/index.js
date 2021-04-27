import React from "react";
import {useSelector, useDispatch} from "react-redux";
import io from "socket.io-client";

const endPoint = "http://localhost:5000";
const socket = io(endPoint);

export default function Sidebar(){

    // change variables based on Jason's redux store
    const myChannels = useSelector(state => state.user.channels);
    const currChannel = useSelector(state => state.user.channels);

    async function createChannel(e){

    }

    async function channelClick(e){
        const clickedChannel = e.target.value;
        if(currChannel.id !== clickedChannel.id){
            //leave room
            //join new room
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
                            value={channel.id}
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
