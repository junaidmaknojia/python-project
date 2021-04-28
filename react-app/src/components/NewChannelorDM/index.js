import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory, useParams} from "react-router-dom";

export default function NewChannelorDM({ type }) {

    const user = useSelector(state => state.session.user);
    const [newChannelName, setNewChannelName] = useState("");
    const [selectedUser, setSelectedUser] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const allChannels = await dispatch(listChannels());
        const allUsers = await dispatch(listUsers());
    }, [dispatch]);

    async function submitNewChannel(e) {
        e.preventDefault();
        const submitChannel = {title: newChannelName, type, user_id: user.id};
        const freshChannel = await dispatch(makeChannel(submitChannel));
        // socket.emit("leave_room", {name: user.username, room: currChannel.title}) #this needs to be commented in when we have routes working
        socket.emit("join_room", {name: user.username, room: freshChannel.title})
        history.push(`/channels/${freshChannel.id}`);
    }

    async function handleJoin(e, type, tempId){
        if(type === "ch"){
            await dispatch(joinChannel({channelId: tempId, user_id: user.id}));
        } else {
            await dispatch(createDM({otherUserId: tempId, user_id: user.id}));
        }
    }

    let display;
    if(type === "ch"){
        display = (
            <>
                <h2>All Channels</h2>
                <form onSubmit={submitNewChannel}>
                    <h3>Create new channel</h3>
                    <input
                        placeholder="Channel name"
                        value={newChannelName}
                        onChange={e => setNewChannelName(e.target.value)}
                        type="text"
                        required
                    />
                    <button type="submit">Create</button>
                </form>
                <div>
                    {allChannels && (
                        allChannels.map(channel => (
                            <div id={channel.id}>
                                <p>{channel.title}</p>
                                <button onClick={e => handleJoin(e, "ch", channel.id)}>Join</button>
                            </div>
                        ))
                    )}
                </div>
            </>
        );
    }else {
        display = (
            <>
                <h2>All Users</h2>
                <div>
                    {allUsers && (
                        allUsers.map(user => (
                            <div id={user.id}>
                                <p>{user.title}</p>
                                <button onClick={e => handleJoin(e, "dm", user.id)}>Start DM</button>
                            </div>
                        ))
                    )}
                </div>
            </>
        );
    }

    return (
        <>
            {display}
        </>
    );
}
