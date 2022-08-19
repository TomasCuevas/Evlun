import { useNavigate } from 'react-router-dom';

//* hooks *//
import { useAuthStore } from '../../hooks/useAuthStore';

export const ProfileDeactivate = () => {
  const { followers, followings, username, avatar, name } = useAuthStore();
  const navigate = useNavigate();

  const onNavigate = () => {
    navigate(`/profile/${username}`);
  };

  return (
    <section
      className="flex w-full cursor-pointer flex-col gap-[5px] p-[10px] px-[5%] pt-[30px] transition-all duration-300 hover:bg-decorateorange/5"
      onClick={onNavigate}
    >
      <div>
        <img
          src={avatar}
          alt="profile-img"
          className="h-10 w-10 rounded-full object-cover object-center"
        />
      </div>

      <div className="flex flex-col">
        <div className="w-full text-ellipsis whitespace-nowrap text-lg font-bold text-text">
          <p className="overflow-hidden text-ellipsis">{name}</p>
        </div>
        <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm font-normal text-decorateorange/70">
          <p className="overflow-hidden text-ellipsis">@{username}</p>
        </div>
      </div>

      <div className="mt-[10px] flex gap-[15px]">
        <div>
          <p className="text-sm font-light text-decorateorange">
            <span className="text-base font-bold text-text">
              {followings.length}
            </span>{' '}
            Siguiendo
          </p>
        </div>
        <div>
          <p className="text-sm font-light text-decorateorange">
            <span className="text-base font-bold text-text">
              {followers.length}
            </span>{' '}
            Seguidores
          </p>
        </div>
      </div>
    </section>
  );
};
