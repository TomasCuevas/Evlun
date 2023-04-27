//* icons *//
import { RiLogoutBoxLine } from "react-icons/ri";

//* store *//
import { useAuthStore } from "@/store";

//* interface *//
interface Props {
  closeModal: () => void;
}

export const LogoutModal: React.FC<Props> = ({ closeModal }) => {
  const { user, setLogout } = useAuthStore();

  return (
    <>
      <div
        className="fixed left-0 top-0 h-screen w-screen bg-white/5"
        onClick={closeModal}
      ></div>
      <div className="absolute bottom-[80px] left-7 z-20 overflow-hidden rounded-lg border border-orange/50 bg-background">
        <section
          onClick={setLogout}
          className="group w-full cursor-pointer px-4 duration-100 hover:bg-orange/20"
        >
          <div className="flex h-[50px] items-center gap-2">
            <RiLogoutBoxLine className="text-2xl text-orange" />
            <span className="whitespace-nowrap text-sm font-light text-white">
              Cerrar Sesión @{user?.username}
            </span>
          </div>
        </section>
      </div>
    </>
  );
};
