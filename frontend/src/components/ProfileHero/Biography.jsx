//* hooks *//
import { useProfileStore } from '../../hooks';

export const Biography = () => {
  const { biography } = useProfileStore();

  return (
    <div className="mt-2 pl-[5%] pr-[5%]">
      <span className="text-base font-light leading-5 text-text/80">
        {biography}
      </span>
    </div>
  );
};
