import { useContext, useState } from "react";
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
import { DesktopSidebarLogout, SidebarLink } from "./";

//* contexts *//
import { AuthContext } from "../../context";

export const DesktopSidebar: React.FC = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <aside className="sticky top-0 z-20 hidden h-screen w-[70px] border-r border-orange bg-background xs:flex xl:w-[270px]">
      <section className="flex w-full flex-col items-center gap-4 py-2 xl:items-start xl:px-4">
        <div className="flex justify-center xl:justify-start">
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
        <SidebarLink
          icon={RiHome7Line}
          iconFill={RiHome7Fill}
          link="/"
          text="Inicio"
        />
        <SidebarLink
          icon={RiSearchLine}
          iconFill={RiSearchLine}
          link="/explore"
          text="Explorar"
          notAuthenticated
        />
        <SidebarLink
          icon={RiBookmarkLine}
          iconFill={RiBookmarkFill}
          link="/bookmarks"
          text="Guardados"
        />
        <SidebarLink
          icon={RiSettings4Line}
          iconFill={RiSettings4Fill}
          link="/settings"
          text="Configuracion"
        />
        <SidebarLink
          icon={RiUserLine}
          iconFill={RiUserFill}
          link={`/profile/${user?.username}`}
          text="Perfil"
        />
        {isModalOpen ? (
          <DesktopSidebarLogout
            closeModal={() => setIsModalOpen((prev) => !prev)}
          />
        ) : null}
        {isAuthenticated === "authenticated" ? (
          <div
            onClick={() => setIsModalOpen((prev) => !prev)}
            className="mt-auto flex w-full cursor-pointer justify-center overflow-hidden xl:justify-start"
          >
            <div className="flex w-full items-center justify-center gap-4 rounded-full p-3 duration-100 hover:bg-orange/20 xl:pr-7">
              <img
                src={user!.avatar}
                alt="profile-img"
                className="h-[35px] w-[35px] rounded-full object-cover object-center xl:h-[40px] xl:w-[40px]"
              />
              <div className="hidden max-w-[250px] flex-col overflow-hidden text-ellipsis whitespace-nowrap text-white xl:flex">
                <span className="w-full text-ellipsis text-base font-bold">
                  {user!.name}
                </span>
                <span className="font-normal text-white/70">
                  @{user!.username}
                </span>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </aside>
  );
};
