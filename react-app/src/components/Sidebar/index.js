import React, { useState, useEffect } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import { makeChannel, userChannels, addChannel } from '../../store/channels';
import "./Sidebar.css";

const endPoint = "http://localhost:5000";
const socket = io(endPoint);

export default function Sidebar(){

    const history = useHistory();
    const channelId = useParams().id;
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const myComms = useSelector(state => state.channels.channels)
    const myChannels = myComms.channel.filter(ch => ch.type === "ch");
    const myDMs = myComms.channel.filter(ch => ch.type === "dm");
    myDMs.forEach(dm => {
        const nameArray = dm.title.split(",");
        dm.title = nameArray.filter(name => name !== user.username).join(", ");
    });
    const currChannel = useSelector(state => state.channels.current);

    // useEffect(() => {
    //     dispatch(addChannel(currChannel));
    // }, [dispatch])

    // useEffect(() => {
    //     dispatch(userChannels())
    // }, [dispatch])

    async function channelClick(e){
        const clickedChannelId = e.target.id;
        if(currChannel.id !== clickedChannelId){
            socket.emit("leave_room", {name: user.username, room: currChannel.title})
            socket.emit("join_room", {name: user.username, room: clickedChannelId.title})
        }
    }

    const changeForm = () => {

    }

    return (
        <div className="sideBar" style={{marginLeft: 5}}>
            <div className="sectionTitles">
            </div>
            <div className="channels" onClick={channelClick}>
                <div className="channels__title">
                    <p>Channels</p>
                    <p>
                        <NavLink className="navLink" to={`/form/${channelId}/ch`}>+</NavLink>
                    </p>
                </div>
                {myChannels && (
                    myChannels.map(channel => (
                        <div key={channel.id}
                            id={channel.id}
                            className="channel__title"
                            onClick={channelClick}>
                            <NavLink className="navLink" to={`/channels/${channel.id}`}>
                                {channel.title}
                            </NavLink>
                        </div>
                    ))
                )}
            </div>
            <div className="directMessages">
                <div className="directMessages__title">
                    <p>Direct Messages</p>
                    <p onClick={changeForm}>
                        <NavLink className="navLink" to={`/form/${channelId}/dm`}>+</NavLink>
                    </p>
                </div>
                {myDMs && (
                    myDMs.map(dm => (
                        <div key={dm.id}
                            // id={dm.id}
                            // className="dm__title"
                            // onClick={channelClick}
                            id={dm.id}
                            className="dm__title"
                        ><NavLink className="navLink" to={`/channels/${dm.id}`}>{dm.title}</NavLink></div>
                    ))
                )}
            </div>
        </div>
    )
}
