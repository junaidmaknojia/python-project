import React, { useEffect } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Sidebar.css";
import { socket } from "../GlobalChat";
import SidebarHeader from "../SidebarHeader";
import { userChannels } from "../../store/channels";

export default function Sidebar(){
    const dispatch = useDispatch();
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

    //socket for when user is added to a channel
    useEffect(() => {
        socket.on("addBack", data => {
            let forMe = false;
            data.forEach(others => {
                if (others.id === user.id) forMe = true;
            })
            forMe && dispatch(userChannels());
        })
    }, [])


    async function channelClick(e, clickedChannelId){
        // const clickedChannelId = e.target.id;
        if(currChannel.id !== clickedChannelId){
            socket.emit("leave_room", {name: user.username, room: currChannel.id})
            socket.emit("join_room", {name: user.username, room: clickedChannelId})
            history.push(`/channels/${clickedChannelId}`)
        }
    }

    const changeForm = () => {

    }

    const deleteDm = (e) => {
        e.stopPropagation();
    }

    return (
        <div className="sideBar" style={{marginLeft: 5}}>
            <SidebarHeader />
            <div className="sectionTitles">
            </div>
            <div className="channels">
                <div className="channels__title">
                    <span>Channels</span>
                    <span>
                        <NavLink className="navLink plusButton" to={`/form/${channelId}/ch`}>+</NavLink>
                    </span>
                </div>
                <div className="channel__list">
                    {myChannels && (
                        myChannels.map(channel => (
                            <div key={channel.id}
                                id={channel.id}
                                onClick={e => channelClick(e, channel.id)}
                                className={`channel__title ${currChannel?.id === channel.id ? "currPage" : ""}`}>
                                <span className="hash">#</span>
                                <span className="chTitle">{channel.title}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className="directMessages">
                <div className="directMessages__title">
                    <span>Direct Messages</span>
                    <span onClick={changeForm}>
                        <NavLink className="navLink plusButton" to={`/form/${channelId}/dm`}>+</NavLink>
                    </span>
                </div>
                <div className="dm__list">
                    {myDMs && (
                        myDMs.map(dm => (
                            <div key={dm.id}
                                id={dm.id}
                                className={`dm__title ${currChannel?.id === dm.id ? "currPage" : ""}`}>
                                {dm.users.length > 2 ? <i className="fas fa-users" style={{marginRight: 5}}></i> : <i className="fas fa-user-friends" style={{marginRight: 5}}></i>}
                                <NavLink className="navLink" to={`/channels/${dm.id}`}>{dm.title}</NavLink>
                                <button className="dmDelete" onClick={deleteDm}>
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
