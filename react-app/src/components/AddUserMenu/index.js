import React, { useState, useEffect } from "react";
import styles from './AddUserMenu.module.css';
import { listUsers } from '../../store/session';
import { useDevs } from "../../context/DevsProvider";

const AddUserMenu = ({ currentChannel }) => {
  const [ allUsers, setAllUsers ] = useState([]);
  const [ querie, setQuerie ] = useState('');
  const [ selectedUsers, setSelectedUsers ] = useState([]);
  const { setShowAdd } = useDevs();
  const [ searchList, setSearchList ] = useState([]);


  useEffect(() => {
    if (allUsers.length >= 1) return;
    listUsers().then(data => setAllUsers(data.users))

  }, [])


  useEffect(() => {
    if (querie.length === 0) {
      setSearchList([]);
      return;
    }

    const searchArray = allUsers.filter(user => {
        const combined = user.username + user.first_name + user.last_name;

        if (combined.toUpperCase().includes(querie.toUpperCase())) {
          return user;
        }

    })

    setSearchList(searchArray);

  }, [querie])


  const cancel = (e) => {
    e.stopPropagation();
    (
      e.target.className === styles.overlay ||
      e.target.className === styles.cancel
    ) &&
    setShowAdd(false);
  }


  const cancelUser = (e) => {
    e.stopPrapagation();
    return;
  }


  const setUser= (e, user) => {
    e.stopPropagation();
    setSelectedUsers(previous => [...previous, user])
  }

  return (
    <div className={styles.overlay} onClick={cancel}>
      <div className={styles.modal}>
        {allUsers &&
        [<div className={styles.addForm}>
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
                  <button key={user.username + 'button'} className={styles.userCancel} onClick={cancelUser}>
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </span>
            <input className={styles.search} value={querie} onChange={e => setQuerie(e.target.value)} />
          </div>
        </div>]}
        {searchList.length >=1 &&
        <div className={styles.searchResults}>
          <ul className={styles.userList}>
              {searchList.map(user => (
                <li key={user.username + 1} onClick={ e => setUser(e, user)}>
                  <img src={user.picture_url} />
                  <span
                    key={Math.random() + user.username}
                    className={styles.searchUsername}>
                    {user.username}
                  </span>
                  <span key={user.first_name} className={styles.fullName}>
                    {`| ${user.first_name} ${user.last_name}`}
                  </span>
                </li>
              ))}
          </ul>
        </div>}
      </div>
    </div>
  )
}

export default AddUserMenu;
