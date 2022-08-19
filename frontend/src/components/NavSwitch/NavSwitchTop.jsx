import { useContext } from 'react';

//* icons *//
import { MdOutlineClose } from 'react-icons/md';

//* context *//
import { NavSwitchContext } from '../../context/NavSwitchContext/NavSwitchContext';

export const NavSwitchTop = () => {
  const { onNavSwitch } = useContext(NavSwitchContext);

  return (
    <section className="flex h-[50px] w-full items-center p-[10px] px-[5%]">
      <p className="w-[90%] text-ellipsis text-lg font-bold text-text">
        Información de la cuenta
      </p>
      <span
        className="flex w-[10%] cursor-pointer items-center justify-end text-3xl font-bold text-decorateorange/70 transition-all duration-300 hover:text-decorateorange"
        onClick={() => onNavSwitch(false)}
      >
        <MdOutlineClose />
      </span>
    </section>
  );
};
