//* components *//
import { Explore } from '../../components/NavTop/Explore';
import { Avatar } from '../../components/NavTop/Avatar';

//* hooks *//
import { useAuthStore } from '../../hooks/useAuthStore';

export const NavTopExplore = () => {
  const { avatar } = useAuthStore();

  return (
    <div className="sticky top-0 z-10 h-[55px] w-full border-b-2 border-decorateorange bg-darkbackground/5 backdrop-blur-xl">
      <nav className="flex h-[55px] w-full items-center gap-[30px] px-[5%]">
        <Avatar avatar={avatar} />
        <Explore />
      </nav>
    </div>
  );
};
