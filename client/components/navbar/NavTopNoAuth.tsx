import NextLink from "next/link";

//* components *//
import { FeedExploreModal, Explore } from "../explore";

export const NavTopNoAuth: React.FC = () => {
  return (
    <div className="sticky top-0 z-10 w-full border-b border-orange bg-bluedark/5 backdrop-blur-xl">
      <nav className="flex h-[55px] w-full items-center gap-[20px]  px-4">
        <img
          src="/evlun-logo.svg"
          alt="evlun logo"
          className="h-[30px] w-[30px]"
        />
        <Explore />
      </nav>

      <div className="w-full px-[25%] py-2">
        <NextLink href="/auth/login" passHref>
          <a>
            <div className="flex h-[30px] cursor-pointer items-center justify-center rounded-full border border-orange text-white transition-all duration-300 hover:border-error hover:text-error">
              <span className="block h-full w-full py-[7px] px-[15px] text-center leading-[18px]">
                Iniciar Sesion
              </span>
            </div>
          </a>
        </NextLink>
      </div>
      <FeedExploreModal />
    </div>
  );
};
