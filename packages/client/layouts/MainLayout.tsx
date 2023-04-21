import Head from "next/head";

//* components *//
import {
  DesktopSidebar,
  MobileSidebar,
  RightSidebar,
} from "../components/sidebar";
import {
  NavTopPost,
  NavTopNoAuth,
  NavTopProfile,
  NavMobileBottom,
  NavTopHome,
  NavTopExplore,
  NavTopSettings,
} from "../components/navbar";

//* store *//
import { useAuthStore } from "../store";

//* interfaces *//
import { ILocation } from "../interfaces";

interface Props {
  children?: React.ReactNode;
  description?: string;
  location?: ILocation;
  name?: string;
  navBottom?: boolean;
  navText?: string;
  title: string;
}

export const MainLayout: React.FC<Props> = ({
  children,
  description,
  location = "main",
  name,
  navBottom = true,
  navText,
  title,
}) => {
  const { isAuthenticated } = useAuthStore();

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
          {isAuthenticated === "no-authenticated" && location !== "explore" ? (
            <NavTopNoAuth />
          ) : null}
          {isAuthenticated === "authenticated" && location === "main" ? (
            <NavTopHome />
          ) : null}
          {isAuthenticated === "authenticated" && location === "post" ? (
            <NavTopPost />
          ) : null}
          {isAuthenticated === "authenticated" && location === "profile" ? (
            <NavTopProfile name={name!} />
          ) : null}
          {isAuthenticated === "authenticated" && location === "bookmarks" ? (
            <NavTopSettings navText={navText!} />
          ) : null}
          {location === "explore" ? <NavTopExplore /> : null}
          {children}
        </main>
        <RightSidebar />

        {isAuthenticated === "authenticated" && navBottom ? (
          <NavMobileBottom />
        ) : null}
      </div>
    </>
  );
};
