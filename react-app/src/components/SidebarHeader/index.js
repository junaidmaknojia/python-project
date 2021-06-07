import React, { useState } from 'react';
import DevModal from '../DevModal';
import logo from '../../assets/slack_hash_256.png';

const SidebarHeader = () => {
  const [ showDevs, setShowDevs ] = useState(false);

  const showModal = () => {
    setShowDevs(true);
  }

  return (
    <div className={styles.sbHeaderWrapper}>
      {showDevs && <DevModal showDevs={showDevs} setShowDevs={setShowDevs} />}
      <div className={styles.buttonContainer}>
        <span className={styles.developers} onClick={showModal}>
          Meed the Developers <i className="fas fa-chevron-down"></i>
        </span>
      </div>
      <div className={styles.logContainger}>
        <span className={styles.logo}>
          <img className={styles.logoImg} src={logo} />
          sn4ck
        </span>
      </div>
    </div>
  )
}

export default SidebarHeader;
