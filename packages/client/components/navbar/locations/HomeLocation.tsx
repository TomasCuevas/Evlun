import NextLink from "next/link";

//* components *//
import { SwitchPost } from "@/components/home";

//* store *//
import { useAuthStore, useUiStore } from "@/store";

export const HomeLocation: React.FC = () => {
  const { user } = useAuthStore();
  const { onSwitchMobileSidebar } = useUiStore();

  return (
    <nav
      style={{
        padding: "8px 0px 0px 0px",
      }}
      className="mx-auto flex h-full w-full flex-col items-center gap-2"
    >
      <section
        className="flex h-full w-full items-center gap-[20px]"
        style={{ padding: "0px 5%" }}
      >
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
      </section>
      <section className="w-full">
        <SwitchPost />
      </section>
    </nav>
  );
};
