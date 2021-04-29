import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {useParams} from "react-router-dom";
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
  img } from "./Header.module.css";

const Header = () => {
  return (
    <div className={main}>
      <div className={leftSide}>
        <div className={logoWrapper}>
        <img className={logo} src={require("../../assets/logo_purple.svg")}/>
        </div>
      </div>
      <div className={center}>
        <button className={searchButton}>
          <span className={span}>Search Snack</span>
        </button>
      </div>
      <div className={rightSide}>
        <div className={userPic}></div>
        <img className={img} src={require("../../assets/big.jpg")}/>
      </div>
    </div>
  )
}

export default Header;
