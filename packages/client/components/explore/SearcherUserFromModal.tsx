import Link from "next/link";

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
  return (
    <Link href={`/${username}`}>
      <article className="flex h-[55px] w-full cursor-pointer items-center gap-3 px-4 hover:bg-orange/10">
        <div className="w-[40px]">
          <img
            src={avatar}
            alt="avatar"
            className="h-[40px] min-w-[40px] rounded-full object-cover object-center"
          />
        </div>
        <div className="mb-1 flex w-full flex-col">
          <span className="text-base font-bold text-white">{name}</span>
          <span className="text-sm font-light leading-4 text-orange/70">
            @{username}
          </span>
        </div>
      </article>
    </Link>
  );
};
