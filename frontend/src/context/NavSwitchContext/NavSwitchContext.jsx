import { createContext, useState } from 'react';

export const NavSwitchContext = createContext();

export const NavSwitchProvider = ({ children }) => {
  const [navSwitch, setNavSwitch] = useState(false);
  const [scroll, setScroll] = useState(window.onscroll);

  const onNavSwitch = (newValue = false) => {
    const scrollNumber = window.scrollY;
    !navSwitch
      ? (window.onscroll = () => {
          window.scroll(0, scrollNumber);
        })
      : (window.onscroll = scroll);
    setNavSwitch(newValue);
  };

  return (
    <NavSwitchContext.Provider
      value={{
        navSwitch,
        onNavSwitch,
      }}
    >
      {children}
    </NavSwitchContext.Provider>
  );
};
