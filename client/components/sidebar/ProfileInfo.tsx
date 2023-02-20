import { useContext } from "react";

//* context *//
import { AuthContext } from "../../context";

export const ProfileInfo: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="mt-4 w-full overflow-hidden rounded-2xl">
      <section>
        <div className="relative h-32 bg-orange/30">
          {user?.banner ? (
            <img
              src={user?.banner}
              alt="user banner image"
              className="h-full w-full object-cover object-center"
            />
          ) : null}
          <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-1">
            <img
              src={user!.avatar}
              alt="user avatar image"
              className="h-[60px] w-[60px] rounded-full border-[2px] border-orange bg-orange/30 object-cover object-center"
            />
            <div className="rounded-xl bg-light/50 px-10 py-1 backdrop-blur-sm">
              <h4 className="text-center text-lg font-bold text-white">
                {user!.name}
              </h4>
              <h4 className="text-center text-sm font-light text-orange">
                @{user!.username}
              </h4>
            </div>
          </div>
        </div>
      </section>
      <section className="flex justify-around bg-light px-4 py-2">
        <div className="flex flex-col items-center">
          <p className="text-sm font-light text-orange">Siguiendo</p>
          <span className="font-bold text-white">
            {user!.followings.length}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm font-light text-orange">Seguidores</p>
          <span className="font-bold text-white">{user!.followers.length}</span>
        </div>
      </section>
    </div>
  );
};
