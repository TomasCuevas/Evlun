//* components *//
import { BackArrow } from "./BackArrow";

//* interface *//
interface Props {
  name: string;
}

export const NavTopProfile: React.FC<Props> = ({ name }) => {
  return (
    <div className="sticky top-0 z-10 h-[55px] w-full items-center border-b-2 border-orange/50 bg-background/5 px-4 backdrop-blur-xl xs:h-[60px]">
      <nav className="mx-auto flex h-full w-full items-center gap-[30px]">
        <div className="flex h-full w-full items-center gap-[20px]">
          <BackArrow />
          <span
            className="cursor-pointer font-bold text-orange xs:text-lg"
            onClick={() => window.scrollTo(0, 0)}
          >
            {name}
          </span>
        </div>
      </nav>
    </div>
  );
};
