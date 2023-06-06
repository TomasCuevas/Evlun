import { useState } from "react";

//* services *//
import { unfollowUserService } from "@/services";

//* store *//
import { useAuthStore } from "@/store";

//* query client *//
import { queryClient } from "@/pages/_app";

//* interface *//
import { IUser } from "@/interfaces";

interface Props {
  userToUnfollow: IUser;
}

export const Following: React.FC<Props> = ({ userToUnfollow }) => {
  const { isAuthenticated, onCheckingWithoutLoader } = useAuthStore();

  const isFetching = queryClient.isFetching([
    `/user/${userToUnfollow.username}`,
  ]);

  const [isSending, setIsSending] = useState(false);
  const [text, setText] = useState("Siguiendo");
  const onChangeValue = () => setText("Dejar de seguir");
  const defaultValue = () => setText("Siguiendo");

  const unfollow = async () => {
    if (isAuthenticated !== "authenticated") return;

    setIsSending(true);

    try {
      await unfollowUserService(userToUnfollow._id);
      onCheckingWithoutLoader();
      queryClient.invalidateQueries({
        queryKey: [`/user/${userToUnfollow.username}`],
      });
    } catch (error) {}

    setIsSending(false);
  };

  return (
    <button
      disabled={isSending || isFetching === 1}
      onClick={unfollow}
      onMouseOver={onChangeValue}
      onMouseLeave={defaultValue}
      className="flex h-[35px] cursor-pointer items-center justify-center whitespace-nowrap rounded-full border border-orange text-white hover:border-error hover:bg-error/5 hover:text-error disabled:cursor-not-allowed disabled:opacity-40"
    >
      <span className="block h-full w-full py-[7px] px-[15px] leading-[18px]">
        {text}
      </span>
    </button>
  );
};
