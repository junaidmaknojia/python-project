import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {useParams} from "react-router-dom";
import SideBar from '../Sidebar'
import ChannelDisplay from '../ChannelDisplay'
import {addChannel, getChannels, userChannels} from '../../store/channels'

const PageWrapper = () => {
    const channelId = useParams().id;
    console.log(channelId)
    let myChannels
    const dispatch = useDispatch()
    useEffect(() => {
        (async () => {
            myChannels = await dispatch(userChannels())
            console.log(myChannels, 'Aaa')
            console.log(typeof channelId)
            const currentChannel = myChannels.find(channel => channel.id === Number(channelId))
            dispatch(addChannel(currentChannel))
        })();
    }, [dispatch])

    return (
        <div>
            <h1>yay!</h1>
            <SideBar />
            {/* <ChannelDisplay /> */}
        </div>
    )
}

export default PageWrapper;