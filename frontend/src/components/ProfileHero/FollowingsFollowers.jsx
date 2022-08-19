//* hooks *//
import { useProfileStore } from '../../hooks/useProfileStore';

//* tailwind-classes *//
const numberClass = 'text-base font-bold text-text';
const descriptionClass = 'text-sm font-light text-decorateorange';

export const FollowingsFollowers = () => {
  const { followings = [], followers = [] } = useProfileStore();
  const followingsLength = followings.length;
  const followersLength = followers.length;

  return (
    <div className="flex gap-[10px] border-b border-decorateorange py-[15px]  pl-[5%] pr-[5%]">
      <div className="flex items-center gap-[5px]">
        <span className={numberClass}>{followingsLength}</span>
        <span className={descriptionClass}>Siguiendo</span>
      </div>
      <div className="flex items-center gap-[5px]">
        <span className={numberClass}>{followersLength}</span>
        <span className={descriptionClass}>Seguidores</span>
      </div>
    </div>
  );
};
