import { useContext } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";

//* icons *//
import {
  BsHouseDoor,
  BsHouseDoorFill,
  BsSearch,
  BsPerson,
  BsPersonFill,
} from "react-icons/bs";

//* context *//
import { AuthContext } from "../../context";

//* tailwind-classes *//
const activeClass =
  "items-center text-orange flex h-full justify-center cursor-pointer";
const noActiveClass =
  "items-center text-orange/30 flex h-full justify-center cursor-pointer";
const iconClass = "text-[26px]";

export const NavMobileBottom: React.FC = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  return (
    <nav className="sticky bottom-0 z-10 mt-auto flex min-h-[55px] w-full items-center justify-around border-t-2 border-orange bg-bluedark backdrop-blur-sm xs:hidden">
      <NextLink href="/" passHref>
        <a className={router.pathname === "/" ? activeClass : noActiveClass}>
          {router.pathname === "/" ? (
            <BsHouseDoorFill className={iconClass} />
          ) : (
            <BsHouseDoor className={iconClass} />
          )}
        </a>
      </NextLink>
      <NextLink href="/explore" passHref>
        <a
          className={
            router.pathname === "/explore" ? activeClass : noActiveClass
          }
        >
          <BsSearch className={iconClass} />
        </a>
      </NextLink>
      <NextLink href={`/profile/${user!.username}`} passHref>
        <a
          className={
            router.asPath === `/profile/${user!.username}`
              ? activeClass
              : noActiveClass
          }
        >
          {router.asPath === `/profile/${user!.username}` ? (
            <BsPersonFill className={iconClass} />
          ) : (
            <BsPerson className={iconClass} />
          )}
        </a>
      </NextLink>
    </nav>
  );
};
