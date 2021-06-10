import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {useParams} from "react-router-dom";
import SideBar from '../Sidebar'
import Header from '../Header'
import ChannelDisplay from '../ChannelDisplay'
import {addChannel} from '../../store/channels'
import { main, sidebar, navbar, msgboard } from './PageWrapper.module.css'

const PageWrapper = () => {
    const dispatch = useDispatch()
    const params = useParams().id;
    const channels = useSelector(state => state.channels.channels)
    const currentChannel = useSelector(state => state.channels.current)

    useEffect(() => {
        const myChannels = Object.values(channels.channel)

        let thisChannel;
        myChannels.forEach(el => {
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
