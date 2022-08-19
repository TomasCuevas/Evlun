import { useNavigate } from 'react-router-dom';

//* components *//
import { Option, Follow, Following } from './';

//* hooks *//
import { useProfileStore, useAuthStore } from '../../hooks';

export const AvatarOptions = () => {
  const { username: authUsername, followings } = useAuthStore();
  const {
    avatar,
    username: profileUsername,
    _id,
    isLoading,
  } = useProfileStore();
  const navigate = useNavigate();

  const onNavigate = () => navigate('/settings/profile');

  return (
    <div className="relative flex min-h-[50px] items-center justify-end pl-[5%] pr-[5%]">
      <div className="absolute left-[5%] top-[-45px]">
        {avatar ? (
          <img
            src={avatar}
            alt="user img"
            className="h-[90px] w-[90px] rounded-full border-[2px] border-decorateorange bg-decorateorange/30 object-cover object-center"
          />
        ) : (
          <div className="h-[90px] w-[90px] rounded-full border-[2px] border-decorateorange bg-decorateorange/30"></div>
        )}
        {}
      </div>
      <div className="flex w-full items-center justify-end gap-[10px]">
        {isLoading ? (
          <></>
        ) : authUsername === profileUsername ? (
          <Option navigate={onNavigate} text="Editar Perfil" />
        ) : (
          <>{followings.includes(_id) ? <Following /> : <Follow />}</>
        )}
      </div>
    </div>
  );
};
