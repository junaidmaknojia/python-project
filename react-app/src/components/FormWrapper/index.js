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
    const dispatch = useDispatch()

    const params = useParams().id;

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
            {currentChannel && <div className={msgboard}><NewChannelorDM type={"ch"} currentChannel={currentChannel}/></div>}
        </div>
    )
}

export default FormWrapper;
