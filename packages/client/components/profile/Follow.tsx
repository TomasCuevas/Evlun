import { MouseEvent, useContext } from "react";
import { useRouter } from "next/router";

//* services *//
import { followOrUnfollowService } from "../../services";

//* context *//
import { AuthContext } from "../../context";

//* interface *//
interface Props {
  userToFollowId: string;
}

export const Follow: React.FC<Props> = ({ userToFollowId }) => {
  const { isAuthenticated, onCheckingWithoutLoader } = useContext(AuthContext);

  const router = useRouter();

  const follow = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (isAuthenticated !== "authenticated") return;

    const result = await followOrUnfollowService("follow", userToFollowId);
    if (result.ok) {
      onCheckingWithoutLoader();
      router.replace(router.asPath);
    }
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
