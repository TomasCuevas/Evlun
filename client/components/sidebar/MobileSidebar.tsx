import { useContext } from "react";
import Link from "next/link";

//* icons *//
import {
  RiCloseLine,
  RiUserLine,
  RiBookmarkLine,
  RiSettings4Line,
  RiLogoutBoxLine,
} from "react-icons/ri";

//* components
import { SidebarMobileLink } from "./";

//* contexts *//
import { AuthContext, UIContext } from "../../context";

export const MobileSidebar: React.FC = () => {
  const { user, onLogout } = useContext(AuthContext);
  const { isSidebarOpen, onSwitchSidebar } = useContext(UIContext);

  if (!isSidebarOpen) return <></>;
  return (
    <aside className="fixed top-0 z-50 grid min-h-screen w-full grid-cols-[70%_30%] xs:hidden">
      <section className="border-r border-orange bg-background">
        <div className="flex flex-col">
          <div className="flex h-[50px] w-full items-center p-[10px] px-4">
            <p className="w-[90%] text-ellipsis text-base font-bold text-white">
              Información de la cuenta
            </p>
            <RiCloseLine
              onClick={onSwitchSidebar}
              className="text-3xl text-orange/70 duration-300 hover:text-orange"
            />
          </div>
          <div className="flex w-full cursor-pointer flex-col gap-[5px] p-[10px] px-4 transition-all duration-300 hover:bg-orange/5">
            <Link href={`/profile/${user!.username}`} passHref>
              <a onClick={onSwitchSidebar}>
                <div>
                  <img
                    src={user!.avatar}
                    alt="profile-img"
                    className="h-10 w-10 rounded-full object-cover object-center"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="w-full text-ellipsis whitespace-nowrap text-lg font-bold text-white">
                    <p className="overflow-hidden text-ellipsis">
                      {user!.name}
                    </p>
                  </div>
                  <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm font-normal text-orange/70">
                    <p className="overflow-hidden text-ellipsis">
                      @{user!.username}
                    </p>
                  </div>
                </div>

                <div className="mt-[10px] flex gap-[15px]">
                  <div>
                    <p className="text-sm font-light text-orange">
                      <span className="text-base font-bold text-white">
                        {user!.followings.length}
                      </span>{" "}
                      Siguiendo
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-light text-orange">
                      <span className="text-base font-bold text-white">
                        {user!.followers.length}
                      </span>{" "}
                      Seguidores
                    </p>
                  </div>
                </div>
              </a>
            </Link>
          </div>
          <div className="w-full">
            <nav className="w-full">
              <ul className="flex flex-col">
                <SidebarMobileLink
                  icon={RiUserLine}
                  link={`/profile/${user!.username}`}
                  text="Perfil"
                />
                <SidebarMobileLink
                  icon={RiBookmarkLine}
                  link="/bookmarks"
                  text="Guardados"
                />
                <SidebarMobileLink
                  icon={RiSettings4Line}
                  link="/settings"
                  text="Configuración"
                />
                <div className="h-[1px] w-full bg-orange"></div>
                <SidebarMobileLink
                  icon={RiLogoutBoxLine}
                  link="/auth/login"
                  text="Cerrar Sesión"
                  onClick={onLogout}
                />
              </ul>
            </nav>
          </div>
        </div>
      </section>

      <section
        className="cursor-pointer bg-white/10  backdrop-blur-sm"
        onClick={onSwitchSidebar}
      ></section>
    </aside>
  );
};
