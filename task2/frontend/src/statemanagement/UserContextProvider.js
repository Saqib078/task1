import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext();

export function useMyContext() {
  return useContext(MyContext);
}

export function MyContextProvider({ children }) {
    const initialState = {
        counter: 0,
      };
  const [globalState, setGlobalState] = useState(initialState);

  // State ko update karne ke liye kisi function ko define karein
  const updateGlobalState = (newState) => {
    setGlobalState(newState);
  };

  return (
    <MyContext.Provider value={{ globalState, updateGlobalState }}>
      {children}
    </MyContext.Provider>
  );
}