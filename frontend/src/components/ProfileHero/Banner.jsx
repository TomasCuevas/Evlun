//* hooks *//
import { useProfileStore } from '../../hooks';

export const Banner = () => {
  const { banner } = useProfileStore();

  return (
    <div className="h-[130px] w-full">
      {banner ? (
        <img
          src={banner}
          alt="banner img"
          className="h-[130px] w-full bg-decorateorange/30 object-cover object-center"
        />
      ) : (
        <div className="h-[130px] w-full bg-decorateorange/30 object-cover object-center"></div>
      )}
    </div>
  );
};
