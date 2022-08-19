//* hooks *//
import { useProfileStore } from '../../hooks';

export const NameUsername = () => {
  const { name, username } = useProfileStore();

  return (
    <div className="flex w-full flex-col pl-[5%] pr-[5%]">
      {username && name ? (
        <>
          <span className="text-2xl font-bold text-text">{name}</span>
          <span className="text-sm font-light text-decorateorange">{`@${username}`}</span>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
