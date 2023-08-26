import { createContext, useContext, useState } from "react";

const contextState = createContext();

const initialState = {
  basket: false,
  search: false,
  profile: false,
  phone: false,
};

const initialAdmin = {
  profile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [isClicked, setisClicked] = useState(initialState);
  const [isclickedAdmin, setisclickedAdmin] = useState(initialAdmin);
  const [activeMenu, setactiveMenu] = useState(false);
  const [screenSize, setscreenSize] = useState(undefined);
  const [cuurentMode, setCurrentMode] = useState("Dark");

  const handleclick = (clicked) => {
    setisClicked({ ...initialState, [clicked]: !isClicked[clicked] });
  };

  const handleclickadmin = (clicked) => {
    setisclickedAdmin({ ...initialAdmin, [clicked]: !isclickedAdmin[clicked] });
  };

  return (
    <contextState.Provider
      value={{
        isClicked,
        setisClicked,
        handleclick,
        activeMenu,
        setactiveMenu,
        screenSize,
        setscreenSize,
        cuurentMode,
        setCurrentMode,
        handleclickadmin,
        isclickedAdmin,
        setisclickedAdmin,
      }}>
      {children}
    </contextState.Provider>
  );
};

export const useStateContext = () => useContext(contextState);
