import React, { createContext, useState, useContext } from 'react';

export const DevsContext = createContext();
export const useDevs = () => useContext(DevsContext);

const DevsProvider = (props) => {
  const [ showDevs, setShowDevs ] = useState(false);


  return (
    <DevsContext.Provider value={
      {
        showDevs,
        setShowDevs
      }
    }>
      {props.children}
    </DevsContext.Provider>
  )
}

export default DevsProvider;
