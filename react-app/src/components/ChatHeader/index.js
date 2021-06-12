import React, {useState} from 'react';
import { useSelector} from 'react-redux'
import styles from './ChatHeader.module.css'
import addUserIcon from '../Icons/icons8-add-male-user-64.png'
import { useDevs } from '../../context/DevsProvider';

const ChatHeader = () => {
    const { setShowAdd } = useDevs();
    const currentChannel = useSelector(state => state.channels.current)
    const channelUsers = currentChannel.users

    const addMenu = () => {
        setShowAdd(true);
    }

    return (
        <div className={styles.componentWrapper}>
            <div className="channelName">
                <h1>{currentChannel.title}</h1>
            </div>

            <div className={styles.usersContainer}>
                <div className={styles.usersDisplay}>
                    {channelUsers[0] && <img className={styles.headerAvatar}
                                            src={channelUsers[0].picture_url}
                                            title={channelUsers[0].username}
                                            alt={channelUsers[0].username} />}
                    {channelUsers[1] && <img className={styles.headerAvatar}
                                            src={channelUsers[1].picture_url}
                                            title={channelUsers[1].username}
                                            alt={channelUsers[1].username} />}
                    {channelUsers[2] && <img className={styles.headerAvatar}
                                            src={channelUsers[2].picture_url}
                                            title={channelUsers[2].username}
                                            alt={channelUsers[2].username} />}
                    <h3 className={styles.usersAMT}>{channelUsers.length}</h3>
                    <button className={styles.addUserButton} onClick={addMenu}>
                        <img className={styles.addUserIcon}
                            src={addUserIcon}
                            title='Add User'
                            alt='Add User' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChatHeader;
