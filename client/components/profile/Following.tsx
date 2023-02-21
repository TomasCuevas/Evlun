import { useState, useContext, MouseEvent } from "react";
import { useRouter } from "next/router";

//* services *//
import { followOrUnfollowService } from "../../services";

//* context *//
import { AuthContext } from "../../context";

//* interface *//
interface Props {
  userToUnfollowId: string;
}

export const Following: React.FC<Props> = ({ userToUnfollowId }) => {
  const { isAuthenticated, onCheckingWithoutLoader } = useContext(AuthContext);
  const [text, setText] = useState("Siguiendo");

  const router = useRouter();

  const onChangeValue = () => setText("Dejar de seguir");
  const defaultValue = () => setText("Siguiendo");

  const unfollow = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (isAuthenticated !== "authenticated") return;

    const result = await followOrUnfollowService("unfollow", userToUnfollowId);
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
