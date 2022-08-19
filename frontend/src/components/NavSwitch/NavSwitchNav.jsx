//* icons *//
import { FaRegUser, FaRegSun } from 'react-icons/fa';
import { BsBookmarks } from 'react-icons/bs';

//* hooks *//
import { useAuthStore } from '../../hooks';

//* components *//
import { NavItem } from './NavItem';

export const NavSwitchNav = () => {
  const { username } = useAuthStore();

  return (
    <section className="w-full py-[10px]">
      <nav className="w-full">
        <ul className="flex flex-col">
          <NavItem
            link={`/profile/${username}`}
            icon={FaRegUser}
            text="Perfil"
          />
          <NavItem link="/bookmarks" icon={BsBookmarks} text="Guardados" />
          <NavItem link="/settings" icon={FaRegSun} text="Configuración" />
        </ul>
      </nav>
    </section>
  );
};
