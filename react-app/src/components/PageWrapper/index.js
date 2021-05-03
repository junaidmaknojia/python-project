import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {useHistory, useParams} from "react-router-dom";
import SideBar from '../Sidebar'
import Header from '../Header'
import ChannelDisplay from '../ChannelDisplay'
import {addChannel} from '../../store/channels'
import { main, sidebar, navbar, msgboard } from './PageWrapper.module.css'

const PageWrapper = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const params = useParams().id;
    const channels = useSelector(state => state.channels.channels)
    const currentChannel = useSelector(state => state.channels.current)
    // const [channelId, setChannelId] = useState()

    // useEffect(() => {
    //     setChannelId(params)
    // }, [])

    useEffect(() => {
        const myChannels = Object.values(channels.channel)

        let thisChannel;
        myChannels.forEach(el => {
            console.log(el.id, params, "IDSSSSSS")
            if(el.id === Number(params)) thisChannel = el
        })

        dispatch(addChannel(thisChannel))
    }, [dispatch, params])

    return (
        <div className={main}>
            {currentChannel && <div className={navbar}><Header /></div>}
            {currentChannel && <div className={sidebar}><SideBar /></div>}
            {currentChannel && <div className={msgboard}><ChannelDisplay currentChannel={currentChannel}/></div>}
        </div>
    )
}

export default PageWrapper;
