import { useNavigate } from 'react-router-dom';

//* hooks *//
import { useAuthStore } from '../../hooks/useAuthStore';

export const AvatarSection = () => {
  const { avatar, name, username } = useAuthStore();
  const navigate = useNavigate();

  const onNavigate = () => {
    navigate(`/profile/${username}`);
  };

  return (
    <section className="flex min-w-[45px] max-w-[10%] flex-col">
      <img
        onClick={onNavigate}
        src={avatar}
        alt={name}
        className="h-[45px] w-[45px] cursor-pointer rounded-full object-cover"
      />
    </section>
  );
};
