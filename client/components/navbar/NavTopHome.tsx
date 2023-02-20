import { useContext } from "react";
import NextLink from "next/link";

//* contexts *//
import { AuthContext, UIContext } from "../../context";

export const NavTopHome: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { onSwitchSidebar } = useContext(UIContext);

  return (
    <div className="sticky top-0 z-10 h-[55px] w-full border-b-2 border-orange/50 bg-background/5 px-4 backdrop-blur-3xl xs:h-[60px]">
      <nav className="flex h-full w-full items-center gap-[30px]">
        <div className="max-h-[30px] min-h-[30px] min-w-[30px] max-w-[30px] xs:hidden">
          <img
            onClick={onSwitchSidebar}
            src={user!.avatar}
            alt="profile-img"
            className="h-[30px] w-[30px] cursor-pointer rounded-full object-cover object-center"
          />
        </div>
        <div>
          <NextLink href="/" passHref>
            <a className="cursor-pointer text-lg font-bold text-orange xs:text-xl">
              Inicio
            </a>
          </NextLink>
        </div>
      </nav>
    </div>
  );
};
