import React from 'react';
import styles from './SplashPage.module.css';
import logo from '../../assets/slack_hash_256.png';


const SplashPage = () => {

    return (
        <div className={styles.splashWrapper}>
            <div className={styles.splashContainer}>
                <section>

                <div className={styles.splashHeader}>
                    <span className={styles.splashLogo}>
                        <img className={styles.splashLogoImg} src={logo} />
                        sn4ck
                    </span>

                    <div className={styles.buttonContainer}>
                        <button className={styles.authButton}>LOG IN</button>
                        <button className={styles.authButton}>SIGN UP</button>
                        <button className={styles.demoButton}>TRY FOR FREE</button>
                    </div>
                </div>

                <div className={styles.announcementBanner}>
                    <h3 className={styles.announcementText}>How much can you benefit from eating a sn4ck?</h3>
                    <a className={styles.announcementLink}>Learn more...</a>
                </div>
                </section>

                {/* <div className={styles.contentContainer}>
                    <h1>"Sn4ck makes it "
                        <span className={styles.hightlightText}>downright delicious</span>
                        " to work together"
                    </h1>
                </div> */}
            </div>
        </div>
    )
}

export default SplashPage;