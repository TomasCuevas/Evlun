import { useContext } from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import "dayjs/locale/es";

//* icons *//
import { BsCalendar3, BsPinMap } from "react-icons/bs";

//* components *//
import { Follow, Following } from "./";

//* services *//
import { followOrUnfollowService } from "../../services";

//* context *//
import { AuthContext } from "../../context";

//* tailwind-classes *//
const itemClass = "items-center flex gap-[10px] text-white";
const iconClass = "text-orange text-lg";
const descriptionClass = "text-sm text-white/80";
const numberClass = "text-base font-bold text-white";
const descriptionClassAlternative = "text-sm font-light text-orange";

//* interfaces *//
import { IUser } from "../../interfaces/user";

interface Props {
  user: IUser;
}

export const ProfileHero: React.FC<Props> = ({ user }) => {
  const { user: userContext, isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  const date = new Date(user.date!).toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  const followOrUnfollowUser = async (status: "follow" | "unfollow") => {
    if (isAuthenticated !== "authenticated") return;

    const result = await followOrUnfollowService(status, user._id);
    if (result.ok) {
      router.replace(router.asPath);
    }
  };

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
          {userContext?.username === user.username ? (
            <div className="flex h-full cursor-pointer items-center justify-center rounded-full border border-orange py-[7px] px-[10px] transition-all duration-300 hover:bg-orange/10">
              <span
                onClick={() => router.push("/settings/profile")}
                className="text-[15px] font-bold text-white"
              >
                Editar Perfil
              </span>
            </div>
          ) : (
            <>
              {user.followers.includes(userContext?._id || "") ? (
                <Following onClick={() => followOrUnfollowUser("unfollow")} />
              ) : (
                <Follow onClick={() => followOrUnfollowUser("follow")} />
              )}
            </>
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

      <section className="mt-4 flex w-full flex-wrap gap-[15px] px-4">
        {user.location && (
          <span className={itemClass}>
            <BsPinMap className={iconClass} />
            <span className={descriptionClass}>{user.location}</span>
          </span>
        )}
        <span className={itemClass}>
          <BsCalendar3 className={iconClass} />
          <span className={descriptionClass}>{`Se unio en ${date}`}</span>
        </span>
      </section>

      <section className="flex gap-[10px] border-b border-orange py-[15px]  px-4">
        <div className="flex items-center gap-[5px]">
          <span className={numberClass}>{user.followings.length}</span>
          <span className={descriptionClassAlternative}>Siguiendo</span>
        </div>
        <div className="flex items-center gap-[5px]">
          <span className={numberClass}>{user.followers.length}</span>
          <span className={descriptionClassAlternative}>Seguidores</span>
        </div>
      </section>
    </article>
  );
};
