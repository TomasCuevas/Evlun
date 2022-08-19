import { useContext } from 'react';

//* components *//
import {
  NavSwitchTop,
  NavSwitchProfile,
  NavSwitchNav,
  NavSwitchBottom,
} from '../../components/NavSwitch';

//* contexts *//
import { NavSwitchContext } from '../../context/NavSwitchContext/NavSwitchContext';

export const NavSwitch = () => {
  const { navSwitch, onNavSwitch } = useContext(NavSwitchContext);

  if (!navSwitch) return <></>;

  return (
    <div className="fixed top-0 z-50 grid min-h-screen w-full max-w-[400px] grid-cols-[70%_30%]">
      <section className="border-r border-decorateorange bg-darkbackground">
        <div className="flex flex-col">
          <NavSwitchTop />
          <NavSwitchProfile />
          <NavSwitchNav />
          <NavSwitchBottom />
        </div>
      </section>

      <section
        className="cursor-pointer bg-lightbackground/30"
        onClick={() => onNavSwitch(false)}
      ></section>
    </div>
  );
};
