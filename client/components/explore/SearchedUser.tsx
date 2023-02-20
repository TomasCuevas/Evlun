import { useRouter } from "next/router";

//* interface *//
interface Props {
  avatar: string;
  name: string;
  username: string;
}

export const SearchedUser: React.FC<Props> = ({ avatar, name, username }) => {
  const router = useRouter();

  return (
    <article
      onClick={() => router.push(`/profile/${username}`)}
      className="flex h-[85px] w-full cursor-pointer items-center gap-3 px-4 transition-all duration-300 hover:bg-orange/10"
    >
      <div className="w-[55px]">
        <img
          src={avatar}
          alt="avatar"
          className="h-[55px] min-w-[55px] rounded-full object-cover object-center"
        />
      </div>
      <div className="flex w-full flex-col">
        <span className="text-lg font-black text-white">{name}</span>
        <span className="text-sm font-light text-orange/70">@{username}</span>
      </div>
    </article>
  );
};
