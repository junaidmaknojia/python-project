import React, {useEffect, useState} from "react";
import GlobalChat from '../GlobalChat';
import ChatHeader from '../ChatHeader';
import {getMessages} from '../../services/messages.js'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'

const ChannelDisplay = () => {
    const currentChannel = useSelector(state => state.channels.current)
    const [ pastMessages, setPastMessages ] = useState(null);
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        (async () => {
            const result = await getMessages(currentChannel.id)
            if(result) setPastMessages(result);
            setLoaded(true);
            }
        )();
    }, [currentChannel])

    return (
        <div className="channel-display_wrapper">
            <ChatHeader />
            {!loaded && (<h1>Loading...</h1>)}
            {loaded && pastMessages && (<GlobalChat pastMessages={pastMessages.message} />)}
        </div>
    )
}

export default ChannelDisplay;
