import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {useParams} from "react-router-dom";

const Header = () => {
  return (
    <div>
      <h2>I'm a navbar</h2>
    </div>
  )
}

export default Header;
