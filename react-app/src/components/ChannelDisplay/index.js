import React, {useEffect, useState} from "react";
import GlobalChat from '../GlobalChat';
import {getMessages} from '../../services/messages.js';

const ChannelDisplay = () => {
    const channel_id = 1 // TO-DO: add use state
    // TO-DO: use params, grab channel_id
    const [ pastMessages, setPastMessages ] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            const result = await getMessages(channel_id)
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
