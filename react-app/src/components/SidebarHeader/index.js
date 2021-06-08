import React, { useState } from 'react';
import DevModal from '../DevModal';
import logo from '../../assets/slack_hash_256.png';
import styles from './SidebarHeader.module.css';
import { useDevs } from '../../context/DevsProvider';

const SidebarHeader = () => {
  const { setShowDevs } = useDevs();

  const showModal = () => {
    setShowDevs(true);
  }

  return (
    <div className={styles.sbHeaderWrapper} onClick={showModal}>
      <div className={styles.buttonContainer}>
        <span className={styles.developers}>
          Meet the Developers <i className="fas fa-chevron-down"></i>
        </span>
      </div>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src={logo}/>
      </div>
    </div>
  )
}

export default SidebarHeader;
