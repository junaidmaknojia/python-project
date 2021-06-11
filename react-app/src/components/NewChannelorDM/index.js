import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import { applyMiddleware } from "redux";
import { listUsers } from "../../store/session";
import { socket } from "../GlobalChat";
import {
    listChannels,
    listDMs,
    makeChannel,
    joinChannel,
    leaveChannel,
    createDM,
    userChannels,
    addChannel} from "../../store/channels";
import styles from "./NewChannelorDM.module.css";


export default function NewChannelorDM() {
    const history = useHistory();
    const type = useParams().ty;
    const user = useSelector(state => state.session.user);
    const myChannels = useSelector(state => state.channels.channels);
    const currChannel = useSelector(state => state.channels.current);
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

    function removeUserFromList(clickedUser){
        const updatedUsersList = [...addedUsers].filter(user => user.id !== clickedUser.id);
        setAddedUsers(updatedUsersList);
    }

    function addUserToList(clickedUser){
        if(!addedUsers.includes(clickedUser)){
            setAddedUsers([...addedUsers, clickedUser]);
        }
    }

    async function joinDm(){
        // first check for an existing DM with the same combo of users
        const allDMs = await listDMs();
        const addedUsers2 = [...addedUsers]
        addedUsers2.unshift(user); // adding session user to match the DM user combos
        const sortedAddedUsers = addedUsers2.sort((obj1, obj2) => obj2.id - obj1.id);
        const addedUsersString = sortedAddedUsers.map(user => user.id).join(",");
        for(let i=0; i<allDMs.length; i++){
            let dm = allDMs[i];
            let test = dm.users.map(user => user.id).join(",");
            if(test === addedUsersString){ // got a match
                dispatch(addChannel(dm));
                history.push(`/channels/${dm.id}`);
                return;
            }
        }
        // existing DM was not found, so make one
        const newDM = await dispatch(createDM({otherUsers: addedUsers, user_id: user.id}));
        history.push(`/channels/${newDM.id}`);
    }

    const joinCh = async(e, channel) => {
        await dispatch(joinChannel({channelId: channel.id, user_id: user.id}));
        await dispatch(userChannels());
    }


    function userInChannel(id){
        const foundChannel = myChannels.channel.find(ch => ch.id === id);
        return foundChannel ? true : false;
    }

    async function handleLeave(e, channel){

        if(window.confirm(`Are you sure you want to leave ${channel.title}?`)){
            await dispatch(leaveChannel({channelId: channel.id, user_id: user.id}));
            await dispatch(userChannels())
            e.target.innerText = "Join";
        }
    }

    const handleClick = (e, channel) => {
        switch (e.target.innerText) {
            case "Leave":
                handleLeave(e, channel);

            case "Join":
                joinCh(e, channel);
                e.target.innerText = "Leave";
        }

    }

    if(type === "ch"){
        display = (
            <div className={styles.section}>
                <h1>Channels</h1>
                <form onSubmit={submitNewChannel} style={{paddingBottom: 18, borderBottom: "lightgray 1px solid"}}>
                    <input
                        style={{height: 30, width: 350}}
                        placeholder="New channel name..."
                        value={newChannelName}
                        onChange={e => setNewChannelName(e.target.value)}
                        type="text"
                        required
                    />
                    <button type="submit" className={styles.create}>Create</button>
                </form>
                <div className={styles.mainScroller}>
                    {allChannels?.map((channel, i) => {
                        return (
                        <div id={channel.id} className={styles.listItem}>
                            <h3>{`# ${channel.title}`}</h3>
                            <p style={{color: "gray", fontSize: 12}}>{`${channel.users.length} member${channel.users.length !== 1?"s":""}`}</p>
                            <button className={userInChannel(channel.id) ? styles.leave : styles.enter}
                                key={i} onClick={e=>handleClick(e, channel)}>
                                {userInChannel(channel.id)?"Leave":"Join"}
                            </button>
                        </div>
                        )
                    })}
                </div>
            </div>
        );
    }else {
        display = (

            <div className={styles.section}>
                <h1>All Users</h1>
                <div style={{paddingBottom: 10, borderBottom: "1px solid lightgray"}}>
                    <div className={styles.addedUsers}>

                        {addedUsers?.map(user => (
                            <div className={styles.addedUser}>
                                <span>{user.username}</span>
                                <span className={styles.ex} onClick={e => removeUserFromList(user)}>X</span>
                            </div>
                        ))}
                    </div>

                    <button hidden={addedUsers.length < 1} className={styles.create} onClick={joinDm}>Create Chat</button>

                </div>
                <div className={styles.mainScroller}>
                    {allUsers?.map(user => (
                        <div id={user.id} className={styles.listItem}>
                            <img src={user.profile_url} className={styles.profilePic}/>
                            <h3>{user.username}</h3>
                            <button className={styles.add} onClick={e => addUserToList(user)}>Add</button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <>
            {loaded && display}
        </>
    );
}
