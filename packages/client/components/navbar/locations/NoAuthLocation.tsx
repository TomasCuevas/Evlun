import Link from "next/link";

//* components *//
import { FeedExploreModal, Explore } from "@/components/explore";

export const NoAuthLocation: React.FC = () => {
  return (
    <div className="sticky top-0 z-10 w-full border-b border-orange/50 bg-background/5 backdrop-blur-xl">
      <nav className="flex h-[55px] w-full items-center gap-[20px] px-4 xl:hidden">
        <img
          src="/evlun-logo.svg"
          alt="evlun logo"
          className="h-[30px] w-[30px]"
        />
        <Explore />
      </nav>
      <div className="xl:hidden">
        <FeedExploreModal />
      </div>

      <div className="w-full px-[25%] py-2">
        <Link href="/auth/login" passHref>
          <a>
            <div className="hover:bg-orange/3 flex h-[30px] cursor-pointer items-center justify-center rounded-full border border-orange/80 text-white hover:border-orange hover:bg-orange/10">
              <span className="block h-full w-full py-[7px] px-[15px] text-center leading-[18px]">
                Iniciar Sesión
              </span>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};
