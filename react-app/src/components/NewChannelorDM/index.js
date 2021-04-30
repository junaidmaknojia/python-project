import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import { listChannels, listDMs, makeChannel, joinChannel, leaveChannel, createDM } from "../../store/channels";
import { listUsers } from "../../store/session";
import { socket } from "../GlobalChat";

export default function NewChannelorDM() {
    const history = useHistory();
    const type = useParams().ty;
    const user = useSelector(state => state.session.user);
    const myChannels = useSelector(state => state.channels.channels);
    const [newChannelName, setNewChannelName] = useState("");
    const [allUsers, setAllUsers] = useState([]);
    const [allChannels, setAllChannels] = useState([]);
    const [addedUsers, setAddedUsers] = useState([]);
    const [ loaded, setLoaded ] = useState(false);
    const dispatch = useDispatch();
    let display;

    useEffect(() => {
        (async () => {
            const channelList = await listChannels();
            setAllChannels(channelList.channel)
            let userList = await listUsers();
            userList = userList.users;
            // --------- Helpful code below if you want to filter 1-1 DMs that already exist -----------
            // const allDMs = await listDMs();
            // let myUsers = allDMs.filter(dm => dm.users.length === 2).map(dm => dm.users);
            // myUsers = myUsers.flat().filter(us => us.id !== user.id);
            // let hermes = [];
            // userList.forEach(user => {
            //     if(!myUsers.find(us => us.username === user.username)) hermes.push(user);
            // });
            // let hermes2 = hermes.filter(us => us.id !== user.id);
            let hermes2 = userList.filter(us => us.id !== user.id);
            setAllUsers(hermes2);
            if (allChannels && allUsers) setLoaded(true)
        })()
    }, []);

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
            const foundDM = await dmExists();
            if(foundDM){
                console.log("existing group");
                // Redirect to that dm group
                history.push(`/channels/${foundDM.id}`);
            } else {
                console.log("new dm group");
                const newDM = await dispatch(createDM({otherUsers: addedUsers, user_id: user.id}));
                history.push(`/channels/${newDM.id}`);
            }
        }
    }

    async function dmExists(){
        const allDMs = await listDMs();
        const sortedAddedUsers = addedUsers.sort((obj1, obj2) => obj1.id - obj2.id);
        sortedAddedUsers.unshift(user); // adding session user to match the DMs
        const hermes = allDMs.find(dm => {
            if(dm.users.length === (sortedAddedUsers.length)){
                console.log("same length", dm.users);
                for (let i = 0; i < dm.users.length; i++) {
                    if(dm.users[i].id !== sortedAddedUsers[i].id){
                        return false;
                    }
                }
                return true;
            }
            return false;
        });
        return hermes;
    }

    function addUserToList(clickedUser){
        if(!addedUsers.includes(clickedUser)){
            setAddedUsers([...addedUsers, clickedUser]);
        }
    }

    function userInChannel(id){
        const foundChannel = myChannels.channel.find(ch => ch.id === id);
        return foundChannel ? true : false;
    }

    async function handleLeave(e, channel){

        if(window.confirm(`Are you sure you want to leave ${channel.title}?`)){
            await dispatch(leaveChannel({channelId: channel.id, user_id: user.id}));
        }
    }

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
                    {allChannels?.map(channel => (
                        <div id={channel.id}>
                            <p>{channel.title}</p>
                            <button disabled={!userInChannel(channel.id)} onClick={e => handleLeave(e, channel)}>Leave</button>
                            <button disabled={userInChannel(channel.id)} onClick={e => handleJoin(e, "ch", channel.id)}>Join</button>
                        </div>
                    ))}
                </div>
            </>
        );
    }else {
        display = (
            <>
                <h2>All Users</h2>
                <div>
                    {/* {addedUsers?.length > 0 && (addedUsers?.map(user => (
                        <div>{user.username}</div>
                    )))} */}
                    {addedUsers?.map(user => (
                        <div>{user.username}</div>
                    ))}
                    <button onClick={e => handleJoin(e, "dm", user.id)}>Create Chat</button>
                </div>
                <div>
                    {allUsers?.map(user => (
                        <div id={user.id}>
                            <p>{user.username}</p>
                            <button onClick={e => addUserToList(user)}>Add</button>
                        </div>
                    ))}
                </div>
            </>
        );
    }

    return (
        <>
            {loaded && display}
        </>
    );
}
