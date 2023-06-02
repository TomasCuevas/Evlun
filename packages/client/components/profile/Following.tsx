import { useState } from "react";

//* services *//
import { unfollowUserService } from "@/services";

//* store *//
import { useAuthStore, useUserStore } from "@/store";

//* interface *//
import { IUser } from "@/interfaces";

interface Props {
  userToUnfollow: IUser;
}

export const Following: React.FC<Props> = ({ userToUnfollow }) => {
  const { isAuthenticated, onCheckingWithoutLoader } = useAuthStore();
  const { getUser } = useUserStore();

  const [text, setText] = useState("Siguiendo");
  const onChangeValue = () => setText("Dejar de seguir");
  const defaultValue = () => setText("Siguiendo");

  const unfollow = async () => {
    if (isAuthenticated !== "authenticated") return;

    try {
      await unfollowUserService(userToUnfollow._id);
      onCheckingWithoutLoader();
      getUser(userToUnfollow.username);
    } catch (error) {}
  };

  return (
    <button
      onClick={unfollow}
      onMouseOver={onChangeValue}
      onMouseLeave={defaultValue}
      className="flex h-[35px] cursor-pointer items-center justify-center whitespace-nowrap rounded-full border border-orange text-white hover:border-error hover:bg-error/5 hover:text-error"
    >
      <span className="block h-full w-full py-[7px] px-[15px] leading-[18px]">
        {text}
      </span>
    </button>
  );
};
