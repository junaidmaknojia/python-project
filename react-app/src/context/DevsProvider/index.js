import React, { createContext, useState, useContext } from 'react';

export const DevsContext = createContext();
export const useDevs = () => useContext(DevsContext);

const DevsProvider = (props) => {
  const [ showDevs, setShowDevs ] = useState(false);
  const [ showAdd, setShowAdd ] = useState(false);


  return (
    <DevsContext.Provider value={
      {
        showDevs,
        setShowDevs,
        showAdd,
        setShowAdd
      }
    }>
      {props.children}
    </DevsContext.Provider>
  )
}

export default DevsProvider;
