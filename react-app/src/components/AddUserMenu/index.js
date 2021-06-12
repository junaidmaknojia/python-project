import React, { useState, useEffect } from "react";
import styles from './AddUserMenu.module.css';
import { listUsers } from '../../store/session';
import { useDevs } from "../../context/DevsProvider";
import { socket } from '../GlobalChat';

const AddUserMenu = ({ currentChannel }) => {
  const [ allUsers, setAllUsers ] = useState([]);
  const [ querie, setQuerie ] = useState('');
  const [ selectedUsers, setSelectedUsers ] = useState([]);
  const { setShowAdd } = useDevs();
  const [ searchList, setSearchList ] = useState([]);
  const [ activeSearch, setActiveSearch ] = useState(false);


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
      e.target.className === styles.cancel ||
      e.target.id === 'test'
    ) &&
    setShowAdd(false);
  }


  const cancelUser = (e, userId) => {
    e.stopPropagation();
    const filteredArray = selectedUsers.filter(user => user.id !== userId)
    setSelectedUsers(filteredArray);
    filteredArray.length === 0 && setActiveSearch(false);
  }


  const setUser= (e, user) => {
    e.stopPropagation();

    setSelectedUsers(previous => (
      previous.includes(user)?[...previous]:[...previous, user])
    )
    setActiveSearch(true);
    setQuerie('');
  }

  const addUser = (e) => {
    const data = {
      users: selectedUsers.map(user => user.id),
      channel_id: currentChannel.id
    }
    socket.emit("add", data);
    setShowAdd(false);
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
              <i id='test' className="fas fa-times fa-2x"></i>
              </button>
            </div>
          </div>
          <div className={styles.fakeInput}>
            {selectedUsers && selectedUsers.map(user => (
              <span className={styles.selectedUser} key={user.username} id={user}>
                <img key={user.picture_url} src={user.picture_url} />
                <span key={user.username} className={styles.username}>{user.username}</span>
                <button key={user.username + 'button'} className={styles.userCancel} onClick={(e)=> cancelUser(e, user.id)}>
                <i className="fas fa-times"></i>
                </button>
              </span>
            ))}
            <input
              className={activeSearch?styles.active:styles.search}
              value={querie}
              onChange={e => setQuerie(e.target.value)}
              placeholder={activeSearch?'':'Search a user by Name or username'} />
          </div>
          <div className={styles.positioner}>
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
          <div className={styles.addFlexer}>
            <button className={styles.addUser} onClick={addUser}>Add User</button>
          </div>
        </div>]}
      </div>
    </div>
  )
}

export default AddUserMenu;
