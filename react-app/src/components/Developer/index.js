import React from 'react';
import styles from './Developer.module.css';

const Developer = ({devImage, devName}) => {
  return (
    <div className={styles.devWrapper}>
      <div className={styles.imgContainer} styles={{backgroundImage: `url(${devImage})`}}>
      </div>
      <div className={styles.nameContainer}>
        <span className={styles.devName}>{`${devName}`}</span>
      </div>
    </div>
  )
}

export default Developer;
