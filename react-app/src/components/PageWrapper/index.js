import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {useParams} from "react-router-dom";
import SideBar from '../Sidebar'
import Header from '../Header'
import ChannelDisplay from '../ChannelDisplay'
import {addChannel, userChannels} from '../../store/channels'
import { main, sidebar, navbar, msgboard } from './PageWrapper.module.css'

const PageWrapper = () => {
    const currentChannel = useSelector(state => state.channels.current)
    const allChannels = useSelector(state => state.channels.current)
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch()
    const [channelId, setChannelId] = useState()
    const params = useParams().id;

    useEffect(() => {
        setChannelId(params)
    })

    useEffect(() => {
        (async () => {
            const channels= await dispatch(userChannels())
            if (channels) {

                const myChannels = Object.values(channels.channel)

                let thisChannel;
                myChannels.forEach(el => {
                    if(el.id === Number(channelId)) thisChannel = el
                })

                dispatch(addChannel(thisChannel))
            }

        })();
    }, [dispatch, channelId])

    useEffect (() => {
        if (currentChannel && allChannels) setLoaded(true);

    }, [currentChannel, allChannels])

    return (
        <div className={main}>
            {loaded && <div className={navbar}><Header /></div>}
            {loaded && <div className={sidebar}><SideBar /></div>}
            {loaded && <div className={msgboard}><ChannelDisplay currentChannel={currentChannel}/></div>}
        </div>
    )
}

export default PageWrapper;
