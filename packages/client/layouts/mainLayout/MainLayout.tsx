import Head from "next/head";
import { useRouter } from "next/router";

//* components *//
import {
  DesktopSidebar,
  MobileSidebar,
  RightSidebar,
} from "@/components/sidebar";
import {
  NavbarTop,
  NavbarBottom,
  NavbarBottomLogout,
} from "@/components/navbar";
import { FullLoader } from "@/components/ui";

//* store *//
import { useAuthStore } from "@/store";

//* interface *//
interface Props {
  children?: React.ReactNode;
  description?: string;
  navBottom?: boolean;
  title: string;
  withoutAuth?: boolean;
}

export const MainLayout: React.FC<Props> = ({
  children,
  description,
  navBottom = true,
  title,
  withoutAuth = false,
}) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();

  if (isAuthenticated === "no-authenticated" && withoutAuth === false) {
    router.replace("/auth/login");
  }

  if (isAuthenticated !== "authenticated" && withoutAuth === false) {
    return <FullLoader />;
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={description ? description : "descripcion del sitio"}
        />
      </Head>

      <div className="flex min-h-[calc(100vh_+_10px)] w-full flex-col items-start bg-background xs:flex-row xs:justify-center">
        {isAuthenticated === "authenticated" ? <MobileSidebar /> : null}

        <DesktopSidebar />

        <main className="min-h-[calc(100vh_+_10px)] w-full xs:w-[calc(100%_-_70px)] xs:border-r xs:border-orange/50 sm:max-w-[600px]">
          <NavbarTop />
          {children}
        </main>

        <RightSidebar />

        {isAuthenticated === "authenticated" && navBottom && <NavbarBottom />}
        {isAuthenticated === "no-authenticated" && <NavbarBottomLogout />}
      </div>
    </>
  );
};
