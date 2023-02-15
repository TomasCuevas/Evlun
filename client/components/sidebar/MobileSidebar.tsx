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
          <section className="flex h-[50px] w-full items-center p-[10px] px-4">
            <p className="w-[90%] text-ellipsis text-base font-bold text-white">
              Información de la cuenta
            </p>
            <RiCloseLine
              onClick={onSwitchSidebar}
              className="text-3xl text-orange/70 duration-300 hover:text-orange"
            />
          </section>
          <section className="flex w-full cursor-pointer flex-col gap-[5px] p-[10px] px-4 transition-all duration-300 hover:bg-orange/5">
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
          </section>
          <section className="w-full">
            <nav className="w-full">
              <ul className="flex flex-col">
                <li>
                  <Link href={`/profile/${user!.username}`} passHref>
                    <a
                      onClick={onSwitchSidebar}
                      className="flex h-[50px] w-full items-center gap-[10px] px-4 transition-all duration-300 hover:bg-orange/5"
                    >
                      <RiUserLine className="text-2xl text-orange" />
                      <span className=" font-light text-white">Perfil</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/bookmarks" passHref>
                    <a
                      onClick={onSwitchSidebar}
                      className="flex h-[50px] w-full items-center gap-[10px] px-4 transition-all duration-300 hover:bg-orange/5"
                    >
                      <RiBookmarkLine className="text-2xl text-orange" />
                      <span className=" font-light text-white">Guardados</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/settings" passHref>
                    <a
                      onClick={onSwitchSidebar}
                      className="flex h-[50px] w-full items-center gap-[10px] px-4 transition-all duration-300 hover:bg-orange/5"
                    >
                      <RiSettings4Line className="text-2xl text-orange" />
                      <span className=" font-light text-white">
                        Configuración
                      </span>
                    </a>
                  </Link>
                </li>
              </ul>
            </nav>
          </section>
          <section className="flex h-[50px] w-full items-center border-t border-orange px-4">
            <div
              className="flex  items-center gap-[10px]"
              onClick={() => {
                onSwitchSidebar();
                onLogout();
              }}
            >
              <RiLogoutBoxLine className="relative left-[2px] text-2xl text-orange" />
              <span className="cursor-pointer font-light text-white">
                Cerrar Sesión
              </span>
            </div>
          </section>
        </div>
      </section>

      <section
        className="cursor-pointer bg-white/10  backdrop-blur-sm"
        onClick={onSwitchSidebar}
      ></section>
    </aside>
  );
};
