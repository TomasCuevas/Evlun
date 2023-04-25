import { useState } from "react";
import { useRouter } from "next/router";

//* services *//
import { unfollowUserService } from "@/services";

//* store *//
import { useAuthStore } from "@/store";

//* interface *//
interface Props {
  userToUnfollowId: string;
}

export const Following: React.FC<Props> = ({ userToUnfollowId }) => {
  const { isAuthenticated, onCheckingWithoutLoader } = useAuthStore();
  const router = useRouter();

  const [text, setText] = useState("Siguiendo");
  const onChangeValue = () => setText("Dejar de seguir");
  const defaultValue = () => setText("Siguiendo");

  const unfollow = async () => {
    if (isAuthenticated !== "authenticated") return;

    const result = await unfollowUserService(userToUnfollowId);
    if (result.ok) {
      onCheckingWithoutLoader();
      router.replace(router.asPath);
    }
  };

  return (
    <button
      onClick={unfollow}
      onMouseOver={onChangeValue}
      onMouseLeave={defaultValue}
      className="flex h-[35px] cursor-pointer items-center justify-center whitespace-nowrap rounded-full border border-orange text-white transition-all duration-300 hover:border-error hover:bg-error/5 hover:text-error"
    >
      <span className="block h-full w-full py-[7px] px-[15px] leading-[18px]">
        {text}
      </span>
    </button>
  );
};
