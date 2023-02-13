import { useContext } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";

//* icons *//
import {
  BsBookmarks,
  BsBoxArrowInLeft,
  BsGear,
  BsPerson,
  BsXLg,
} from "react-icons/bs";

//* contexts *//
import { AuthContext, UIContext } from "../../context";

export const MobileSidebar: React.FC = () => {
  const { user, onLogout } = useContext(AuthContext);
  const { isSidebarOpen, onSwitchSidebar } = useContext(UIContext);

  const router = useRouter();

  if (!isSidebarOpen) return <></>;

  return (
    <aside className="fixed top-0 z-50 grid min-h-screen w-full grid-cols-[70%_30%] xs:hidden">
      <section className="border-r border-orange bg-bluedark">
        <div className="flex flex-col">
          <section className="flex h-[50px] w-full items-center p-[10px] px-4">
            <p className="w-[90%] text-ellipsis text-lg font-bold text-white">
              Información de la cuenta
            </p>
            <span
              className="flex w-[10%] cursor-pointer items-center justify-end text-xl font-bold text-orange/70 transition-all duration-300 hover:text-orange"
              onClick={onSwitchSidebar}
            >
              <BsXLg />
            </span>
          </section>
          <section
            className="flex w-full cursor-pointer flex-col gap-[5px] p-[10px] px-4 transition-all duration-300 hover:bg-orange/5"
            onClick={() => {
              onSwitchSidebar();
              router.push(`/profile/${user!.username}`);
            }}
          >
            <div>
              <img
                src={user!.avatar}
                alt="profile-img"
                className="h-10 w-10 rounded-full object-cover object-center"
              />
            </div>
            <div className="flex flex-col">
              <div className="w-full text-ellipsis whitespace-nowrap text-lg font-bold text-white">
                <p className="overflow-hidden text-ellipsis">{user!.name}</p>
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
          </section>
          <section className="w-full">
            <nav className="w-full">
              <ul className="flex flex-col">
                <li>
                  <NextLink href={`/profile/${user!.username}`} passHref>
                    <a
                      onClick={onSwitchSidebar}
                      className="flex h-[50px] w-full items-center gap-[10px] px-4 transition-all duration-300 hover:bg-orange/5"
                    >
                      <BsPerson className="text-2xl text-orange" />
                      <span className=" font-light text-white">Perfil</span>
                    </a>
                  </NextLink>
                </li>
                <li>
                  <NextLink href="/bookmarks" passHref>
                    <a
                      onClick={onSwitchSidebar}
                      className="flex h-[50px] w-full items-center gap-[10px] px-4 transition-all duration-300 hover:bg-orange/5"
                    >
                      <BsBookmarks className="text-2xl text-orange" />
                      <span className=" font-light text-white">Guardados</span>
                    </a>
                  </NextLink>
                </li>
                <li>
                  <NextLink href="/settings" passHref>
                    <a
                      onClick={onSwitchSidebar}
                      className="flex h-[50px] w-full items-center gap-[10px] px-4 transition-all duration-300 hover:bg-orange/5"
                    >
                      <BsGear className="text-2xl text-orange" />
                      <span className=" font-light text-white">
                        Configuración
                      </span>
                    </a>
                  </NextLink>
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
              <BsBoxArrowInLeft className="relative left-[2px] text-2xl text-orange" />
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
