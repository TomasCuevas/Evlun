import { useContext, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

//* icons *//
import {
  RiHome7Line,
  RiHome7Fill,
  RiUserLine,
  RiUserFill,
  RiBookmarkLine,
  RiBookmarkFill,
  RiSettings4Line,
  RiSettings4Fill,
  RiSearchLine,
} from "react-icons/ri";

//* components *//
import { DesktopSidebarLogout } from "./";

//* contexts *//
import { AuthContext } from "../../context";

//* talwind-classes *//
const divClass = "flex justify-center xl:justify-start";
const spansContainer =
  "flex items-center gap-4 hover:bg-orange/20 p-3 justify-center xl:pr-7 rounded-full duration-100";
const spanClassActive = "hidden text-xl font-semibold text-white xl:block";
const spanClass = "hidden text-xl font-semibold text-white/80 xl:block";

export const DesktopSidebar: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  if (!user) return <></>;
  return (
    <aside className="sticky top-0 z-10 hidden h-screen w-[70px] border-r border-orange bg-background xs:flex xl:w-[270px]">
      <section className="flex w-full flex-col items-center gap-4 py-2 xl:items-start xl:px-4">
        <div className={divClass}>
          <Link href="/" passHref>
            <a className="flex items-center gap-5 rounded-full p-3 hover:bg-orange/20">
              <img
                src="/evlun-logo.svg"
                alt="Evlun logo"
                className="h-9 w-9 xl:h-10 xl:w-10"
              />
            </a>
          </Link>
        </div>
        <div className={divClass}>
          <Link href="/" passHref>
            <a className={spansContainer}>
              {router.pathname === "/" ? (
                <>
                  <RiHome7Fill className="text-[26px] text-orange" />
                  <span className={spanClassActive}>Inicio</span>
                </>
              ) : (
                <>
                  <RiHome7Line className="text-[26px] text-orange/70" />
                  <span className={spanClass}>Inicio</span>
                </>
              )}
            </a>
          </Link>
        </div>
        <div className={divClass}>
          <Link href="/explore" passHref>
            <a className={spansContainer}>
              {router.pathname === "/explore" ? (
                <>
                  <RiSearchLine className="text-[26px] text-orange" />
                  <span className={spanClassActive}>Explorar</span>
                </>
              ) : (
                <>
                  <RiSearchLine className="text-[26px] text-orange/70" />
                  <span className={spanClass}>Explorar</span>
                </>
              )}
            </a>
          </Link>
        </div>
        <div className={divClass}>
          <Link href="/bookmarks" passHref>
            <a className={spansContainer}>
              {router.pathname === "/bookmarks" ? (
                <>
                  <RiBookmarkFill className="text-[26px] text-orange" />
                  <span className={spanClassActive}>Guardados</span>
                </>
              ) : (
                <>
                  <RiBookmarkLine className="text-[26px] text-orange/70" />
                  <span className={spanClass}>Guardados</span>
                </>
              )}
            </a>
          </Link>
        </div>
        <div className={divClass}>
          <Link href="/settings" passHref>
            <a className={spansContainer}>
              {router.pathname === "/settings" ? (
                <>
                  <RiSettings4Fill className="text-[26px] text-orange" />
                  <span className={spanClassActive}>Configuracion</span>
                </>
              ) : (
                <>
                  <RiSettings4Line className="text-[26px] text-orange/70" />
                  <span className={spanClass}>Configuracion</span>
                </>
              )}
            </a>
          </Link>
        </div>
        <div className={divClass}>
          <Link href={`/profile/${user!.username}`} passHref>
            <a className={spansContainer}>
              {router.asPath === `/profile/${user!.username}` ? (
                <>
                  <RiUserFill className="text-[26px] text-orange" />
                  <span className={spanClassActive}>Perfil</span>
                </>
              ) : (
                <>
                  <RiUserLine className="text-[26px] text-orange/70" />
                  <span className={spanClass}>Perfil</span>
                </>
              )}
            </a>
          </Link>
        </div>
        {isModalOpen ? (
          <DesktopSidebarLogout
            closeModal={() => setIsModalOpen((prev) => !prev)}
          />
        ) : null}
        <div
          onClick={() => setIsModalOpen((prev) => !prev)}
          className={`${divClass} mt-auto flex w-full cursor-pointer justify-center overflow-hidden`}
        >
          <div className={`${spansContainer} w-full`}>
            <img
              src={user!.avatar}
              alt="profile-img"
              className="h-[35px] w-[35px] rounded-full object-cover object-center xl:h-[40px] xl:w-[40px]"
            />
            <div className="hidden max-w-[250px] flex-col overflow-hidden text-ellipsis whitespace-nowrap text-white xl:flex">
              <span className="w-full text-ellipsis text-base font-bold">
                {user.name}
              </span>
              <span className="font-normal text-white/70">
                @{user.username}
              </span>
            </div>
          </div>
        </div>
      </section>
    </aside>
  );
};
