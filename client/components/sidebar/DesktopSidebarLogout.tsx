import { useContext } from "react";

import { BsBoxArrowInLeft } from "react-icons/bs";

//* context *//
import { AuthContext } from "../../context/AuthContext";

interface Props {
  closeModal: () => void;
}

export const DesktopSidebarLogout: React.FC<Props> = ({ closeModal }) => {
  const { user, onLogout } = useContext(AuthContext);

  return (
    <>
      <div
        className="fixed left-0 top-0 h-screen w-screen bg-white/5"
        onClick={closeModal}
      ></div>
      <div className="absolute bottom-[85px] left-7 z-20 rounded-lg border border-orange bg-bluedark shadow-md shadow-orange/70">
        <section className="flex cursor-default items-center gap-3 py-4 pl-3 pr-10">
          <div>
            <img
              src={user!.avatar}
              alt="profile-img"
              className="min-h-[55px] min-w-[55px] rounded-full object-cover object-center"
            />
          </div>
          <div>
            <h3 className="text-white">{user!.name}</h3>
            <h3 className="text-orange">@{user!.username}</h3>
          </div>
        </section>
        <hr className="border-orange" />
        <section
          onClick={() => {
            onLogout();
          }}
          className="w-full cursor-pointer py-1 pl-3 pr-10"
        >
          <div className="flex h-[50px] items-center gap-2">
            <BsBoxArrowInLeft className="text-2xl text-orange" />
            <span className="text-lg text-white">Cerrar Sesión</span>
          </div>
        </section>
      </div>
    </>
  );
};
