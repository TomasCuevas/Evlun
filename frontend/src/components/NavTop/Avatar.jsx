import { useContext } from 'react';

//* context *//
import { NavSwitchContext } from '../../context/NavSwitchContext/NavSwitchContext';

export const Avatar = ({ avatar }) => {
  const { onNavSwitch } = useContext(NavSwitchContext);

  return (
    <div className="max-h-[30px] min-h-[30px] min-w-[30px] max-w-[30px]">
      <img
        onClick={() => onNavSwitch(true)}
        src={avatar}
        alt="profile-img"
        className="min-h-[30px] min-w-[30px] cursor-pointer rounded-full object-cover object-center"
      />
    </div>
  );
};
