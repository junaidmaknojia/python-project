import React, {useState} from 'react';
import {useSelector} from 'react-redux'
import { useDevs } from '../../context/DevsProvider';
import ProfileModal from "../ProfileModal";
import {
  main,
  leftSide,
  logoWrapper,
  logo,
  center,
  searchButton,
  span,
  rightSide,
  userPic,
  img,
  modalButton } from "./Header.module.css";

  // *********search bar/button********************
  // <button className={searchButton}>
  //   <span className={span}>Search Snack</span>
  // </button>
  // **********************************************

const Header = () => {
  const [ show, setShow ] = useState(false)
  const currentUser = useSelector(state => state.session.user)

  const showModal = () => {
    setShow(true)
  }

  return (
    <div className={main}>
      <div className={leftSide}>
        <div className={logoWrapper}>
        <img className={logo} src={require("../../assets/logo_purple.svg")}/>
        </div>
      </div>
      <div className={center}>
        {/*search bar goes here*/}
      </div>
      <div className={rightSide}>
        <div className={userPic}>
          <button className={modalButton} onClick={showModal}>
            <img className={img} src={currentUser.picture_url}/>
          </button>
        </div>
        <ProfileModal show={show} setShow={setShow} user={currentUser} />
      </div>
    </div>
  )
}

export default Header;
