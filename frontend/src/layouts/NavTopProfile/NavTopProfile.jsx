//* components *//
import { Back } from '../../components/NavTop/Back';
import { NavText } from '../../components/NavTop/NavText';

//* hooks *//
import { useProfileStore } from '../../hooks/useProfileStore';

export const NavTopProfile = () => {
  const { name } = useProfileStore();

  return (
    <div className="sticky top-0 z-10 min-h-[55px] w-full border-b-2 border-decorateorange bg-darkbackground/5 backdrop-blur-xl">
      <div className="mx-auto h-full w-[90%]">
        <div className="flex h-full w-full items-center gap-[20px]">
          <Back />
          <span
            className="cursor-pointer"
            onClick={() => window.scrollTo(0, 0)}
          >
            <NavText textBig={name} />
          </span>
        </div>
      </div>
    </div>
  );
};
