import Link from "next/link";

//* components *//
import { Following, Follow } from "@/components/profile";

//* stores *//
import { useAuthStore, useRightSidebarStore } from "@/store";

//* interfaces *//
import { IUser } from "@/interfaces";

export const RelevantPersons: React.FC = () => {
  const { user } = useAuthStore();
  const { relevantPersons } = useRightSidebarStore();

  if (relevantPersons.length === 0) return <></>;

  return (
    <div className="mt-4 flex w-full flex-col overflow-hidden rounded-2xl bg-grayLight">
      <h2 className="my-2 px-4 text-xl font-bold text-white">
        Personas relevantes
      </h2>
      {relevantPersons.map((person) => (
        <Link key={person._id} href={`/profile/${person.username}`}>
          <article className="cursor-pointer px-4 py-2 hover:bg-light">
            <div className="flex h-full gap-[10px]">
              <div>
                <img
                  src={person.avatar}
                  alt={person.username}
                  className="h-[45px] min-h-[45px] w-[45px] min-w-[45px] cursor-pointer rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col overflow-hidden text-ellipsis whitespace-nowrap">
                <span className="cursor-pointer overflow-hidden text-ellipsis text-base font-semibold  text-white">
                  {person.name}
                </span>
                <span className="cursor-pointer overflow-hidden text-ellipsis text-base font-light text-orange">
                  @{person.username}
                </span>
              </div>
              {user && user._id === person._id ? null : (
                <div
                  className="my-auto ml-auto"
                  onClick={(event) => event.stopPropagation()}
                >
                  {user && user.followings.includes(person._id) ? (
                    <Following userToUnfollow={person as IUser} />
                  ) : (
                    <Follow userToFollow={person as IUser} />
                  )}
                </div>
              )}
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
};
