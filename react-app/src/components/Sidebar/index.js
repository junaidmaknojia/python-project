import React from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Sidebar.css";
import { socket } from "../GlobalChat";

export default function Sidebar(){
    const history = useHistory();
    const channelId = useParams().id;
    const currChannel = useSelector(state => state.channels.current);
    const user = useSelector(state => state.session.user);
    const myComms = useSelector(state => state.channels.channels)

    const myChannels = myComms.channel.filter(ch => ch.type !== "dm");
    const myDMs = myComms.channel.filter(ch => ch.type === "dm");

    myDMs.forEach(dm => {
        const nameArray = dm.title.split(",");
        dm.title = nameArray.filter(name => name !== user.username).join(", ");
    });


    async function channelClick(e){
        const clickedChannelId = e.target.id;
        if(currChannel.id !== clickedChannelId){
            socket.emit("leave_room", {name: user.username, room: currChannel.id})
            socket.emit("join_room", {name: user.username, room: clickedChannelId})
            history.push(`/channels/${clickedChannelId}`)
        }
    }

    const changeForm = () => {

    }

    return (
        <div className="sideBar" style={{marginLeft: 5}}>
            <div className="sectionTitles">
            </div>
            <div className="channels">
                <div className="channels__title">
                    <p>Channels</p>
                    <p>
                        <NavLink className="navLink plusButton" to={`/form/${channelId}/ch`}>+</NavLink>
                    </p>
                </div>
                <div className="channel__list">
                    {myChannels && (
                        myChannels.map(channel => (
                            <div key={channel.id}
                            id={channel.id}
                            onClick={channelClick}
                            className={`channel__title ${currChannel?.id === channel.id ? "currPage" : ""}`}>

                                    {`# ${channel.title}`}

                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className="directMessages">
                <div className="directMessages__title">
                    <p>Direct Messages</p>
                    <p onClick={changeForm}>
                        <NavLink className="navLink plusButton" to={`/form/${channelId}/dm`}>+</NavLink>
                    </p>
                </div>
                <div className="dm__list">
                    {myDMs && (
                        myDMs.map(dm => (
                            <div key={dm.id}
                                id={dm.id}
                                className={`dm__title ${currChannel?.id === dm.id ? "currPage" : ""}`}>
                                {dm.users.length > 2 ? <i className="fas fa-users" style={{marginRight: 5}}></i> : <i className="fas fa-user-friends" style={{marginRight: 5}}></i>}
                                <NavLink className="navLink" to={`/channels/${dm.id}`}>{dm.title}</NavLink>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
