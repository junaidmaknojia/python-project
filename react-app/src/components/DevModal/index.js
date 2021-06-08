import React from 'react';
import fancy from '../../assets/fancy.jpg';
import big from '../../assets/big.jpg';
import nic from '../../assets/nic.jpg';
import rader from '../../assets/rader.jpg';
import Developer from '../Developer';
import styles from './DevModal.module.css';
import { useDevs } from '../../context/DevsProvider';

const devs = [
  {
    name: "Jason Slade",
    pic: big,
    link: "https://www.linkedin.com/in/jason-slade-976a59205/",
    github: "https://github.com/Slade-j",
    profile: "https://www.linkedin.com/in/jason-slade-976a59205/",
  },
  {
    name: "Junaid Maknojia ",
    pic: fancy,
    link: "https://www.linkedin.com/in/junaidmaknojia/",
    github: "https://github.com/junaidmaknojia",
    profile: "https://www.linkedin.com/in/junaidmaknojia/",
  },
  {
    name: "Sean Rader",
    pic: rader,
    link: "https://www.linkedin.com/in/sean-rader-9ba95850/",
    github: "https://github.com/sjrader",
    profile: "https://www.linkedin.com/in/sean-rader-9ba95850/"
  },
  {
    name: "Nic Gauer",
    pic: nic,
    link: "https://www.linkedin.com/in/nic-gauer-b5937a20b/",
    github: "https://github.com/nicgauer",
    profile: "https://www.linkedin.com/in/nic-gauer-b5937a20b/",
  }

]

const DevModal = () => {
  const { setShowDevs } = useDevs();

  const cancelModal = (e) => {
    e.stopPropagation();
    (e.target.className === styles.devOverlay ||
    e.target.className === styles.cancel) &&
    setShowDevs(false);
  }

  return (
    <div className={styles.devOverlay} onClick={cancelModal}>
      <div className={styles.modalWrapper}>
        <div className={styles.cancelFlexer}>
          <button className={styles.cancel} onClick={cancelModal}>
          <i className="fas fa-times"></i>
          </button>
        </div>
        <div className={styles.header}>
          <h1 className={styles.theDevs}>{'< The Devs />'}</h1>
        </div>
        <div className={styles.developersContainer}>
          {devs.map(developer => (
            <Developer key={developer.name} dev={developer} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default DevModal
