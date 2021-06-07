import React from 'react';
import styles from './Developer.module.css';
import { NavLink } from 'react-router-dom';

const Developer = ({ dev }) => {
  return (
    <div className={styles.devWrapper}>
      <div className={styles.imgContainer} styles={{backgroundImage: `url(${dev.pic})`}}>
      </div>
      <div className={styles.nameContainer}>
        <NavLink to={dev.link}>
          <span className={styles.devName}>{`${dev.name}`}</span>
        </NavLink>
      </div>
    </div>
  )
}

export default Developer;
