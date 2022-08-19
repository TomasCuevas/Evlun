//* components *//
import { Back } from '../../components/NavTop/Back';

export const NavTopPost = () => {
  return (
    <div className="sticky top-0 z-10 h-[55px] w-full border-b-2 border-decorateorange bg-transparent backdrop-blur-xl">
      <div className="my-0 mx-auto h-full w-[90%]">
        <div className="flex h-full w-full items-center gap-[20px]">
          <Back />
          <span className="font-bold text-decorateorange">Post</span>
        </div>
      </div>
    </div>
  );
};
