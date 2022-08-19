import { useAuthStore } from '../../hooks/useAuthStore';

//* hooks *//
import { useContext } from 'react';

//* context *//
import { NavSwitchContext } from '../../context';

export const NavSwitchBottom = () => {
  const { onNavSwitch } = useContext(NavSwitchContext);
  const { startLogout } = useAuthStore();

  return (
    <section className="w-full py-[10px]">
      <div className="flex h-[50px] items-center border-t border-decorateorange">
        <span
          onClick={() => {
            onNavSwitch();
            startLogout();
          }}
          className="cursor-pointer px-[5%] text-lg text-text"
        >
          Cerrar Sesión
        </span>
      </div>
    </section>
  );
};
