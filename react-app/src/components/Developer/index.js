import React from 'react';
import styles from './Developer.module.css';
import { Navlink } from 'react-router-dom';

const Developer = ({ dev }) => {
  return (
    <div className={styles.devWrapper}>
      <div className={styles.imgContainer} styles={{backgroundImage: `url(${dev.pic})`}}>
      </div>
      <div className={styles.nameContainer}>
        <Navlink to={dev.link}>
          <span className={styles.devName}>{`${dev.name}`}</span>
        </Navlink>
      </div>
    </div>
  )
}

export default Developer;
