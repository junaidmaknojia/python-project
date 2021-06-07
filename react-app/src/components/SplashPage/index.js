import React from 'react';
import {useHistory} from 'react-router-dom'
import styles from './SplashPage.module.css';
import logo from '../../assets/slack_hash_256.png';
import big from '../../assets/big.jpg';
import fancy from '../../assets/fancy.jpg'


const SplashPage = () => {

    const history = useHistory();
    return (
        <div className={styles.splashWrapper}>
            <div className={styles.splashContainer}>
                <div className={styles.splashHeader}>
                    <span className={styles.splashLogo}>
                        <img className={styles.splashLogoImg} src={logo} />
                        sn4ck
                    </span>

                    <div className={styles.buttonContainer}>
                        <button className={styles.authButton} onClick={() => history.push('/login')}>LOG IN</button>
                        <button className={styles.authButton} onClick={() => history.push('/sign-up')}>SIGN UP</button>
                        <button className={styles.demoButton}>TRY FOR FREE</button>
                    </div>
                </div>

                <div className={styles.announcementBanner}>
                    <h3 className={styles.announcementText}>How much can you benefit from eating a sn4ck?</h3>
                    <a className={styles.announcementLink} src="https://github.com/junaidmaknojia/python-project#readme" target="_blank" rel="noopener noreferrer">Learn more...</a>
                </div>

                <div className={styles.contentContainer}>
                    <h1 className={styles.contentText}>Sn4ck makes it 
                        <span className={styles.highlightText}> downright delicious </span>
                        to work together
                    </h1>
                </div>
                <div className={styles.midButtonContainer}>
                    <button className={styles.demoButton}>TRY FOR FREE</button>
                </div>
                <div className={styles.exampleChatWrapper}>

                <div className={styles.exampleChat}>
                    <div className={styles.exampleTopBar}>
                        <div className={styles.exampleTopBarButtons}>
                            <div className={styles.exampleRedButton}></div>
                            <div className={styles.exampleYellowButton}></div>
                            <div className={styles.exampleGreenButton}></div>
                        </div>
                    </div>
                        <div className={styles.exampleChatContainer}>
                            <div className={styles.exampleSideBar} />
                            <div className={styles.exampleChatWindow}>
                                <div className={styles.exampleChatMessage}>
                                    <img src={big} className={styles.messagePicture} />
                                    <div className={styles.messageTextContainer}>
                                        <span className={styles.messageText}>
                                            Wait... what is sn4ck?
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.exampleChatMessage}>
                                    <img src={fancy} className={styles.messagePicture} />
                                    <div className={styles.messageTextContainer}>
                                        <span className={styles.messageText}>
                                            Who knows?  I've never heard of it
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default SplashPage;
