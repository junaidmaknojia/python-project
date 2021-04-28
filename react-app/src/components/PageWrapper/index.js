import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {useParams} from "react-router-dom";
import SideBar from '../Sidebar'
import ChannelDisplay from '../ChannelDisplay'
import {addChannel, userChannels} from '../../store/channels'

const PageWrapper = () => {
    const currentChannel = useSelector(state => state.channels.current)
    const allChannels = useSelector(state => state.channels.current)
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch()
    const channelId = useParams().id;

    useEffect(() => {
        (async () => {
            const channels= await dispatch(userChannels())
            const myChannels = Object.values(channels.channel)

            let thisChannel;
            myChannels.forEach(el => {
                if(el.id === Number(channelId)) thisChannel = el
            })

            dispatch(addChannel(thisChannel))

        })();
    }, [dispatch])

    useEffect (() => {
        if (currentChannel && allChannels) setLoaded(true);
        return () => {
            setLoaded(false)
        }
    }, [currentChannel, allChannels])

    return (
        <div>
            {loaded && <SideBar />}
            {loaded && <ChannelDisplay currentChannel={currentChannel}/>}
        </div>
    )
}

export default PageWrapper;
