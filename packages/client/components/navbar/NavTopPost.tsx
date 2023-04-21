//* components *//
import { BackArrow } from "./BackArrow";

export const NavTopPost: React.FC = () => {
  return (
    <div className="sticky top-0 z-10 h-[55px] w-full items-center border-b-2 border-orange/50 bg-background/5 px-4 backdrop-blur-xl xs:h-[60px]">
      <nav className="mx-auto flex h-full w-full items-center gap-[30px]">
        <div className="flex h-full w-full items-center gap-[20px]">
          <BackArrow />
          <span className="font-bold text-orange">Post</span>
        </div>
      </nav>
    </div>
  );
};
