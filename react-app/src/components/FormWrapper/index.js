import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {useParams} from "react-router-dom";
import SideBar from '../Sidebar'
import Header from '../Header'
import NewChannelorDM from '../NewChannelorDM'
import {addChannel} from '../../store/channels'
import { main, sidebar, navbar, msgboard } from '../PageWrapper/PageWrapper.module.css'

const FormWrapper = () => {
    const currentChannel = useSelector(state => state.channels.current)
    const channels = useSelector(state => state.channels.channels)
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch()
    // const [channelId, setChannelId] = useState()
    const params = useParams().id;

    // useEffect(() => {
    //     setChannelId(params)
    // })

    useEffect(() => {
        const myChannels = Object.values(channels.channel)
        console.log( channels, "is this even running??????????????")


        let thisChannel;
        myChannels.forEach(el => {
            console.log(el.id, params, "IDSSSSSSSSSS")
            if(el.id === Number(params)) thisChannel = el
        })

        dispatch(addChannel(thisChannel))



    }, [dispatch, params])

    useEffect (() => {
        if (currentChannel && channels) setLoaded(true);

    }, [currentChannel, channels])

    return (
        <div className={main}>
            {loaded && <div className={navbar}><Header /></div>}
            {loaded && <div className={sidebar}><SideBar /></div>}
            {loaded && <div className={msgboard}><NewChannelorDM type={"ch"} currentChannel={currentChannel}/></div>}
        </div>
    )
}

export default FormWrapper;
