import React, {useEffect, useState} from 'react';
import LogoutButton from "../auth/LogoutButton";
import { overlay, main } from "./ProfileModal.module.css";

const ProfileModal = ({show, setShow}) => {

  const modalHide = () => {
    setShow(false)
  }

  if (!show) return null;

  return (
    <div className={overlay} onClick={modalHide}>
      <div className={main}>
        <div>
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}

export default ProfileModal;
