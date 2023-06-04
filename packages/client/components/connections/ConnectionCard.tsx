import Link from "next/link";

//* components *//
import { Follow, Following } from "../profile";

//* store *//
import { useAuthStore } from "@/store";

//* interfaces *//
import { IUser } from "@/interfaces";

interface Props {
  user: IUser;
}

export const ConnectionCard: React.FC<Props> = ({ user }) => {
  const { user: authUser } = useAuthStore();

  return (
    <Link href={`/${user.username}`}>
      <article className="cursor-pointer px-4 py-3 hover:bg-light">
        <div className="flex h-full gap-[10px]">
          <div>
            <img
              src={user.avatar}
              alt={user.username}
              className="h-[45px] min-h-[45px] w-[45px] min-w-[45px] cursor-pointer rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="cursor-pointer overflow-hidden text-ellipsis text-base font-semibold  text-white">
              {user.name}
            </span>
            <span className="cursor-pointer overflow-hidden text-ellipsis text-base font-light text-orange">
              @{user.username}
            </span>
          </div>
          {authUser?._id === user._id ? null : (
            <div
              className="my-auto ml-auto"
              onClick={(event) => event.stopPropagation()}
            >
              {authUser!.followings.includes(user._id) ? (
                <Following userToUnfollow={user as IUser} />
              ) : (
                <Follow userToFollow={user as IUser} />
              )}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};
