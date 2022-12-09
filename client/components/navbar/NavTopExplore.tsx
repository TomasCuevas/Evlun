import { useContext } from "react";

//* components *//
import { Explore } from "../explore";

//* contexts *//
import { AuthContext } from "../../context/AuthContext";
import { UIContext } from "../../context/UIContext";

export const NavTopExplore: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { onSwitchSidebar } = useContext(UIContext);

  return (
    <div className="sticky top-0 z-10 h-[55px] w-full border-b-2 border-orange bg-bluedark/5 px-[5%] backdrop-blur-3xl xs:h-[60px]">
      <nav className="flex h-full w-full items-center gap-[30px]">
        {user ? (
          <div className="max-h-[30px] min-h-[30px] min-w-[30px] max-w-[30px] xs:hidden">
            <img
              src={user.avatar}
              alt="profile-img"
              className="min-h-[30px] min-w-[30px] cursor-pointer rounded-full object-cover object-center"
              onClick={onSwitchSidebar}
            />
          </div>
        ) : null}
        <Explore />
      </nav>
    </div>
  );
};
