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
    link: "https://www.linkedin.com/in/jason-slade-976a59205/"
  },
  {
    name: "Junaid Maknojia ",
    pic: fancy,
    link: "https://www.linkedin.com/in/junaidmaknojia/"
  },
  {
    name: "Sean Rader",
    pic: rader,
    link: "https://www.linkedin.com/in/sean-rader-9ba95850/"
  },
  {
    name: "Nic Gauer",
    pic: nic,
    link: "https://www.linkedin.com/in/nic-gauer-b5937a20b/"
  }

]

const DevModal = () => {
  const { setShowDevs } = useDevs();

  const cancelModal = (e) => {
    e.stopPropagation();
    setShowDevs(false);
  }

  return (
    <div className={styles.devOverlay} onClick={cancelModal}>
      <div className={styles.modalWrapper}>
        <div className={styles.cancelFlexer}>
          <button className={styles.cancel} onClick={cancelModal}>cancel</button>
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
