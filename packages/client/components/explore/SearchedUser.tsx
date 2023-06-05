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
      onClick={() => router.push(`/${username}`)}
      className="flex h-[85px] w-full cursor-pointer items-center gap-3 px-4 hover:bg-orange/10"
    >
      <div className="w-[55px]">
        <img
          src={avatar}
          alt="avatar"
          className="h-[55px] min-w-[55px] rounded-full object-cover object-center"
        />
      </div>
      <div className="mb-1 flex w-full flex-col">
        <span className="text-lg font-bold text-white">{name}</span>
        <span className="text-sm font-light leading-3 text-orange/70">
          @{username}
        </span>
      </div>
    </article>
  );
};
