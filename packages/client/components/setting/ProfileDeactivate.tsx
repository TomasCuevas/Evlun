//* store *//
import { useAuthStore } from "@/store";

export const ProfileDeactivate: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <section className="flex w-full cursor-pointer flex-col gap-[5px] bg-orange/5 p-[10px] px-4 pt-[30px] transition-all duration-300">
      <div>
        <img
          src={user?.avatar}
          alt="profile-img"
          className="h-10 w-10 rounded-full object-cover object-center"
        />
      </div>

      <div className="flex flex-col">
        <div className="w-full text-ellipsis whitespace-nowrap text-lg font-bold text-white">
          <p className="overflow-hidden text-ellipsis">{user?.name}</p>
        </div>
        <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm font-normal text-orange/70">
          <p className="overflow-hidden text-ellipsis">@{user?.username}</p>
        </div>
      </div>

      <div className="mt-[10px] flex gap-[15px]">
        <div>
          <p className="text-sm font-light text-orange">
            <span className="text-base font-bold text-white">
              {user?.followings.length}
            </span>{" "}
            Siguiendo
          </p>
        </div>
        <div>
          <p className="text-sm font-light text-orange">
            <span className="text-base font-bold text-white">
              {user?.followers.length}
            </span>{" "}
            Seguidores
          </p>
        </div>
      </div>
    </section>
  );
};
