import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

//* icons *//
import {
  RiHome7Line,
  RiHome7Fill,
  RiSearchLine,
  RiUserLine,
  RiUserFill,
} from "react-icons/ri";

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
    <nav className="sticky bottom-0 z-10 mt-auto flex min-h-[55px] w-full items-center justify-around border-t-2 border-orange/50 bg-background backdrop-blur-sm xs:hidden">
      <Link href="/" passHref>
        <a className={router.pathname === "/" ? activeClass : noActiveClass}>
          {router.pathname === "/" ? (
            <RiHome7Fill className={iconClass} />
          ) : (
            <RiHome7Line className={iconClass} />
          )}
        </a>
      </Link>
      <Link href="/explore" passHref>
        <a
          className={
            router.pathname === "/explore" ? activeClass : noActiveClass
          }
        >
          <RiSearchLine className={iconClass} />
        </a>
      </Link>
      <Link href={`/profile/${user!.username}`} passHref>
        <a
          className={
            router.asPath === `/profile/${user!.username}`
              ? activeClass
              : noActiveClass
          }
        >
          {router.asPath === `/profile/${user!.username}` ? (
            <RiUserFill className={iconClass} />
          ) : (
            <RiUserLine className={iconClass} />
          )}
        </a>
      </Link>
    </nav>
  );
};
