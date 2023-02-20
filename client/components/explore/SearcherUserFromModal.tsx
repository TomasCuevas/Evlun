import { useRouter } from "next/router";

//* interface *//
interface Props {
  avatar: string;
  name: string;
  username: string;
}

export const SearchedUserFromModal: React.FC<Props> = ({
  avatar,
  name,
  username,
}) => {
  const router = useRouter();

  return (
    <article
      onClick={() => {
        router.push(`/profile/${username}`);
      }}
      className="flex h-[55px] w-full cursor-pointer items-center gap-3 px-4 transition-all duration-300 hover:bg-orange/10"
    >
      <div className="w-[40px]">
        <img
          src={avatar}
          alt="avatar"
          className="h-[40px] min-w-[40px] rounded-full object-cover object-center"
        />
      </div>
      <div className="flex w-full flex-col">
        <span className="text-base font-black text-white">{name}</span>
        <span className="text-sm font-light text-orange/70">@{username}</span>
      </div>
    </article>
  );
};
