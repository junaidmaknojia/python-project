import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {useParams} from "react-router-dom";
import { main, leftSide, logoWrapper, logo } from "./Header.module.css";

const Header = () => {
  return (
    <div className={main}>
      <div className={leftSide}>
        <div className={logoWrapper}>
          <div className={logo} style={{backgroundImage: `url(../../assets/snack.jpg)`}}></div>
        </div>
      </div>
      <div className={"searchWrapper"}>
        <div className={"search"}>
          <button className={"searchButton"}>
            <span className={"span"}>Search Snack</span>
          </button>
        </div>
      </div>
      <div className={"rightSide"}>
        <div className={"userlogo"}></div>
      </div>
      <h2>I'm a navbar</h2>
    </div>
  )
}

export default Header;
