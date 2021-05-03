import React from 'react';
import LogoutButton from "../auth/LogoutButton";
import {
  overlay,
  main,
  userWrapper,
  thePic,
  namePlaque,
  userName,
  buttonWrapper,
  backGround
} from "./ProfileModal.module.css";

const ProfileModal = ({show, setShow, user}) => {

  const modalHide = () => {
    setShow(false)
  }

  if (!show) return null;

  return (
    <div className={overlay} onClick={modalHide}>
      <div className={main}>
        <div className={backGround}>
          <div className={userWrapper}>
            <img className={thePic} src={user.picture_url} />
            <div className={namePlaque}>
              <span className={userName}>{user.username}</span>
            </div>
          </div>
          <div className={buttonWrapper}>
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileModal;
