import { useState } from 'react';

//* hooks *//
import { useProfileStore } from '../../hooks';

export const Following = () => {
  const { startUnfollowing } = useProfileStore();
  const [text, setText] = useState('Siguiendo');

  const unfollow = () => setText('Dejar de seguir');
  const defaultValue = () => setText('Siguiendo');

  return (
    <div
      onClick={startUnfollowing}
      onMouseOver={unfollow}
      onMouseLeave={defaultValue}
      className="flex h-[35px] cursor-pointer items-center justify-center rounded-full border border-decorateorange text-text transition-all duration-300 hover:border-error hover:text-error"
    >
      <span className="block h-full w-full py-[7px] px-[15px] leading-[18px]">
        {text}
      </span>
    </div>
  );
};
