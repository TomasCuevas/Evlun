import { NavLink, useLocation } from 'react-router-dom';

//* icons *//
import { BsHouseDoorFill, BsSearch, BsFillPersonFill } from 'react-icons/bs';

//* hooks *//
import { useAuthStore, usePostsStore, useProfileStore } from '../../hooks';

//* tailwind-classes *//
const activeClass =
  'items-center text-decorateorange flex h-full justify-center w-full cursor-pointer';
const noActiveClass =
  'items-center text-decorateorange/30 flex h-full justify-center w-full cursor-pointer';
const iconClass = 'text-[24px]';

export const Nav = () => {
  const { username } = useAuthStore();
  const { startLoadingPosts } = usePostsStore();
  const { startLoading } = useProfileStore();
  const location = useLocation();

  return (
    <nav className="sticky bottom-0 z-10 mt-auto flex min-h-[55px] w-full border-t-2 border-decorateorange bg-darkbackground">
      {location.pathname === '/' ? (
        <span onClick={() => startLoadingPosts(true)} className={activeClass}>
          <BsHouseDoorFill className={iconClass} />
        </span>
      ) : (
        <NavLink
          to="/"
          replace
          className={({ isActive }) => (isActive ? activeClass : noActiveClass)}
        >
          <BsHouseDoorFill className={iconClass} />
        </NavLink>
      )}
      <NavLink
        to="/explore"
        className={({ isActive }) => (isActive ? activeClass : noActiveClass)}
      >
        <BsSearch className={iconClass} />
      </NavLink>
      {location.pathname.includes(`/profile/${username}`) ? (
        <span
          onClick={() => startLoading(username, true)}
          className={activeClass}
        >
          <BsFillPersonFill className={iconClass} />
        </span>
      ) : (
        <NavLink
          to={`/profile/${username}`}
          className={({ isActive }) => (isActive ? activeClass : noActiveClass)}
        >
          <BsFillPersonFill className={iconClass} />
        </NavLink>
      )}
    </nav>
  );
};
