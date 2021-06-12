import React, { useState, useEffect } from "react";
import styles from './AddUserMenu.module.css';
import { listUsers } from '../../store/session';
import { useDevs } from "../../context/DevsProvider";

const AddUserMenu = ({ currentChannel }) => {
  const [ allUsers, setAllUsers ] = useState([]);
  const [ querie, setQuerie ] = useState('');
  const [ selectedUsers, setSelectedUsers ] = useState([]);
  const { setAddMenu } = useDevs();

  useEffect(() => {
    if (allUsers) return;
    listUsers().then(data => setAllUsers(data.users))
  }, [])

  const cancel = (e) => {
    e.stopPrapagation();
    (
      e.target.className === styles.overlay ||
      e.target.className === styles.cancel
    ) && setAddMenu(false);
  }

  return (
    <div className={styles.overlay} onClick={cancel}>
      <div className={styles.modal}>
        <form className={styles.addForm}>
          <div className={styles.formHeader}>
            <div className={styles.titleContainer}>
              <h3 className={styles.people}>Add people</h3>
              <span className={styles.channel}>{currentChannel.title}</span>
            </div>
            <div className={styles.cancelContainer}>
              <button className={styles.cancel} onClick={cancel}>
              <i className="fas fa-times fa-2x"></i>
              </button>
            </div>
          </div>
            <div className={styles.fakeInput}>
              <span className={styles.selectionWrapper}>
                {selectedUsers && selectedUsers.map(user => (
                  <div className={styles.selectedUser} key={user.username} id={user}>
                    <img key={user.picture_url} src={user.picture_url} />
                    <span key={user.username} className={styles.username}>{user.username}</span>
                    <span key={user.first_name} className={styles.fullName}>
                      {` | ${user.first_name} ${user.last_name}`}
                    </span>
                    <button key={user.username + 'button'} className={styles.userCancel} onClick={cancelUser}>
                      <i className="fas fa-times fa-2x"></i>
                    </button>
                  </div>
                ))}
              </span>
              <input className={styles.search} value={querie} onChange={e => setQuerie(e.target.value)} />
            </div>
        </form>
      </div>
    </div>
  )
}

export default AddUserMenu;
