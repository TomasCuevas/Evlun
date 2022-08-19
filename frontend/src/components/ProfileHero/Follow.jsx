//* hooks *//
import { useProfileStore } from '../../hooks';

export const Follow = () => {
  const { startFollowing } = useProfileStore();

  return (
    <div
      onClick={startFollowing}
      className="flex h-[35px] cursor-pointer items-center justify-center rounded-full bg-decorateorange py-[7px] px-[15px] hover:bg-decorateorange/80"
    >
      <span className="text-[15px] font-bold text-text">Seguir</span>
    </div>
  );
};
