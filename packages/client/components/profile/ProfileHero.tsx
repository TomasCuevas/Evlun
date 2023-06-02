import Link from "next/link";

//* icons *//
import { RiCalendar2Line, RiMapPinLine } from "react-icons/ri";

//* components *//
import { Follow, Following } from "@/components/profile";

//* context *//
import { useAuthStore } from "@/store";

//* interfaces *//
import { IUser } from "@/interfaces";

interface Props {
  user: IUser;
}

export const ProfileHero: React.FC<Props> = ({ user }) => {
  const { user: userByStore } = useAuthStore();

  const date = new Date(user.date!).toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  return (
    <article className="w-full">
      <section className="w-full bg-orange/30 object-cover object-center">
        {user.banner ? (
          <img
            src={user.banner}
            alt="banner img"
            className="h-[130px] w-full bg-orange/10 object-cover object-center xs:h-[150px] sm:h-[200px]"
          />
        ) : (
          <div className="h-[130px] w-full bg-orange/10 object-cover object-center xs:h-[150px] sm:h-[200px]"></div>
        )}
      </section>

      <section className="relative flex min-h-[50px] items-center justify-end px-4 sm:h-16">
        <div className="absolute left-4 bottom-2 sm:bottom-3">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="user img"
              className="h-[90px] w-[90px] rounded-full border-[2px] border-orange bg-orange/30 object-cover object-center sm:h-32 sm:w-32"
            />
          ) : (
            <div className="h-[90px] w-[90px] rounded-full border-[2px] border-orange bg-orange/30 sm:h-32 sm:w-32"></div>
          )}
        </div>
        <div className="flex w-full items-center justify-end gap-[10px]">
          {userByStore?.username === user.username ? (
            <Link href="/settings/profile">
              <button className="flex h-full cursor-pointer items-center justify-center rounded-full border border-orange py-[7px] px-[10px] hover:bg-orange/10">
                <span className="text-[15px] font-bold text-white">
                  Editar Perfil
                </span>
              </button>
            </Link>
          ) : (
            <div>
              {user.followers.includes(userByStore?._id || "") ? (
                <Following userToUnfollow={user} />
              ) : (
                <Follow userToFollow={user} />
              )}
            </div>
          )}
        </div>
      </section>

      <section className="flex w-full flex-col px-4">
        <span className="text-2xl font-bold text-white">{user.name}</span>
        <span className="text-sm font-light text-orange">{`@${user.username}`}</span>
      </section>

      <section className="mt-2 px-4">
        <span className="text-base font-light leading-5 text-white/80">
          {user.biography}
        </span>
      </section>

      <section className="mt-4 flex w-full flex-wrap gap-[15px] px-4 [&>span]:flex [&>span]:items-center [&>span]:gap-[5px] [&>span]:text-white [&>span>svg]:text-lg [&>span>svg]:text-orange [&>span>p]:text-sm [&>span>p]:text-white/80">
        <span style={{ display: user.location ? "flex" : "none" }}>
          <RiMapPinLine />
          <p>{user.location}</p>
        </span>
        <span>
          <RiCalendar2Line />
          <p>{`Se unio en ${date}`}</p>
        </span>
      </section>

      <section className="flex gap-[10px] border-b border-orange py-[15px] px-4 [&>div>span]:text-base [&>div>span]:font-bold [&>div>span]:text-white [&>div>p]:text-sm [&>div>p]:font-light [&>div>p]:text-orange">
        <div className="flex items-center gap-[5px]">
          <span>{user.followings.length}</span>
          <p>Siguiendo</p>
        </div>
        <div className="flex items-center gap-[5px]">
          <span>{user.followers.length}</span>
          <p>Seguidores</p>
        </div>
      </section>
    </article>
  );
};
