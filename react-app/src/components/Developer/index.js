import React from 'react';
import styles from './Developer.module.css';
import { NavLink } from 'react-router-dom';

const Developer = ({ dev }) => {

  //************element holding************
  // <span className={styles.linkedIn}>GitHub</span>
  // <span className={styles.linkedIn}>Linkedin</span>
  return (
    <div className={styles.devWrapper}>
      <div className={styles.imgContainer} style={{backgroundImage: `url(${dev.pic})`}}>
        <a href={dev.link} target="_blank" rel="noopener noreferrer">
          <img className={styles.image} src={dev.pic}/>
        </a>
      </div>
      <div className={styles.nameContainer}>
        <a href={dev.link} className={styles.nameLink} target="_blank" rel="noopener noreferrer">
          <span className={styles.devName}>{`${dev.name}`}</span>
        </a>
        <div className={styles.linkFlexer}>
          <a href={dev.link} className={styles.linkedInLink} target="_blank" rel="noopener noreferrer">
            <div className={styles.trying}>
              <i className="fab fa-linkedin fa-2x"></i>
              <div className={styles.background} />
            </div>
          </a>
          <a href={dev.github} className={styles.gitHubLink} target="_blank" rel="noopener noreferrer">
            <div className={styles.gitLogo}>
              <i className="fab fa-github fa-2x"></i>
              <div className={styles.gitBackground} />
            </div>
          </a>
          <a href={dev.profile} className={styles.profileLink} target="_blank" rel="noopener noreferrer">
            <div className={styles.profileLogo}>
              <i className="fas fa-user fa-2x"></i>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Developer;
