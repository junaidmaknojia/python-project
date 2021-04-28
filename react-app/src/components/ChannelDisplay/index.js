import React, {useEffect, useState} from "react";
import GlobalChat from '../GlobalChat';
import {getMessages} from '../../services/messages.js'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'

const ChannelDisplay = ({currentChannel}) => {
    // const currentChannel = useSelector(state => state.channels.current)
    // const channel_id = currentChannel.id
    console.log(currentChannel, 'props')
    const [ pastMessages, setPastMessages ] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            const result = await getMessages(currentChannel.id)
            if(result) setPastMessages(result);
            setLoaded(true);
            }
        )();
    }, [])

    return (
        <div className="channel-display_wrapper">
            {!loaded && (<h1>Loading...</h1>)}
            {loaded && pastMessages && (<GlobalChat pastMessages={pastMessages.message} />)}
        </div>
    )
}

export default ChannelDisplay;
