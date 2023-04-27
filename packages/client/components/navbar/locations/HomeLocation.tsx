import NextLink from "next/link";

//* store *//
import { useAuthStore, useUiStore } from "@/store";

export const HomeLocation: React.FC = () => {
  const { user } = useAuthStore();
  const { onSwitchMobileSidebar } = useUiStore();

  return (
    <nav className="flex h-full w-full items-center gap-[30px]">
      <div className="max-h-[30px] min-h-[30px] min-w-[30px] max-w-[30px] xs:hidden">
        <img
          onClick={onSwitchMobileSidebar}
          src={user?.avatar}
          alt="profile-img"
          className="h-[30px] w-[30px] cursor-pointer rounded-full object-cover object-center"
        />
      </div>
      <div>
        <NextLink href="/" passHref>
          <a className="cursor-pointer text-lg font-bold text-orange xs:text-xl">
            Inicio
          </a>
        </NextLink>
      </div>
    </nav>
  );
};
