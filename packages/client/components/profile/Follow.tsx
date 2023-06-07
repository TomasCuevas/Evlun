import { useState } from "react";

//* services *//
import { followUserService } from "@/services";

//* store *//
import { useAuthStore } from "@/store";

//* query client *//
import { queryClient } from "@/pages/_app";

//* interface *//
import { IUser } from "@/interfaces";

interface Props {
  userToFollow: IUser;
}

export const Follow: React.FC<Props> = ({ userToFollow }) => {
  const { isAuthenticated, onCheckingWithoutLoader } = useAuthStore();
  const [isSending, setIsSending] = useState(false);

  const follow = async () => {
    if (isAuthenticated !== "authenticated") return;

    setIsSending(true);

    try {
      await followUserService(userToFollow._id);
      onCheckingWithoutLoader();
      await queryClient.refetchQueries({
        queryKey: [`/user/${userToFollow.username}`],
      });
    } catch (error) {}

    setIsSending(false);
  };

  return (
    <button
      onClick={follow}
      disabled={isSending}
      className="flex h-[35px] cursor-pointer items-center justify-center rounded-full bg-orange/80 py-[7px] px-[15px] hover:bg-orange disabled:cursor-not-allowed disabled:opacity-40"
    >
      <span className="text-[15px] font-bold text-white">Seguir</span>
    </button>
  );
};
