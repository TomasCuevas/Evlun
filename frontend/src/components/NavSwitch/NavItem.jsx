import { useContext } from 'react';
import { Link } from 'react-router-dom';

//* context *//
import { NavSwitchContext } from '../../context/NavSwitchContext/NavSwitchContext';

export const NavItem = ({ link, icon: Icon, text }) => {
  const { onNavSwitch } = useContext(NavSwitchContext);

  return (
    <li
      onClick={() => onNavSwitch(false)}
      className="flex h-[50px] items-center px-[5%] transition-all duration-300 hover:bg-decorateorange/5"
    >
      <Link
        className="flex h-[50px] w-full items-center gap-[10px] no-underline"
        to={link}
      >
        <Icon className="text-lg text-decorateorange" />
        <p className="text-lg font-light text-text">{text}</p>
      </Link>
    </li>
  );
};
