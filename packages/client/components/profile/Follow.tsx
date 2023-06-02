//* services *//
import { followUserService } from "@/services";

//* store *//
import { useAuthStore, useUserStore } from "@/store";

//* interface *//
import { IUser } from "@/interfaces";

interface Props {
  userToFollow: IUser;
}

export const Follow: React.FC<Props> = ({ userToFollow }) => {
  const { isAuthenticated, onCheckingWithoutLoader } = useAuthStore();
  const { getUser } = useUserStore();

  const follow = async () => {
    if (isAuthenticated !== "authenticated") return;

    try {
      await followUserService(userToFollow._id);
      getUser(userToFollow.username);
      onCheckingWithoutLoader();
    } catch (error) {}
  };

  return (
    <button
      onClick={follow}
      className="flex h-[35px] cursor-pointer items-center justify-center rounded-full bg-orange/80 py-[7px] px-[15px] hover:bg-orange"
    >
      <span className="text-[15px] font-bold text-white">Seguir</span>
    </button>
  );
};
