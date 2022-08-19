//* components *//
import { Avatar } from '../../components/NavTop/Avatar';

//* hooks *//
import { useAuthStore, usePostsStore } from '../../hooks';

export const NavTopHome = () => {
  const { user } = useAuthStore();
  const { startLoadingPosts } = usePostsStore();
  const { avatar } = user;

  const onScroll = () => {
    window.scrollTo(0, 0);
    startLoadingPosts(true);
  };

  return (
    <div className="sticky top-0 z-10 min-h-[55px] w-full border-b-2 border-decorateorange bg-darkbackground/5 px-[5%] backdrop-blur-xl">
      <nav className="flex h-[50px] w-full items-center gap-[30px]">
        <Avatar avatar={avatar} />
        <div>
          <p
            onClick={onScroll}
            className="cursor-pointer text-lg font-bold text-decorateorange"
          >
            Inicio
          </p>
        </div>
      </nav>
    </div>
  );
};
