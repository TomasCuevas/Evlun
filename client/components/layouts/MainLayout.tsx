import { useContext } from "react";
import Head from "next/head";

//* components *//
import { DesktopSidebar, MobileSidebar } from "../sidebar";
import {
  NavTopPost,
  NavTopNoAuth,
  NavTopProfile,
  NavMobileBottom,
  NavTopHome,
  NavTopExplore,
  NavTopSettings,
} from "../navbar";
import { ExploreSidebar } from "../explore";

//* context *//
import { AuthContext } from "../../context";

//* interfaces *//
import { ILocation } from "../../interfaces/locations";

interface Props {
  children?: React.ReactNode;
  description?: string;
  explore?: boolean;
  location?: ILocation;
  name?: string;
  navBottom?: boolean;
  navText?: string;
  title: string;
}

export const MainLayout: React.FC<Props> = ({
  children,
  description,
  explore = true,
  location = "main",
  name,
  navBottom = true,
  navText,
  title,
}) => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={description ? description : "descripcion del sitio"}
        />
      </Head>

      <div className="flex min-h-screen w-full flex-col items-start bg-background xs:flex-row xs:justify-center">
        {isAuthenticated === "authenticated" ? <MobileSidebar /> : null}
        <DesktopSidebar />
        <main className="min-h-screen w-full xs:w-[calc(100%_-_70px)] xs:border-r xs:border-orange sm:max-w-[600px]">
          {isAuthenticated === "no-authenticated" ? <NavTopNoAuth /> : null}
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
        <ExploreSidebar explore={explore} />

        {isAuthenticated === "authenticated" && navBottom ? (
          <NavMobileBottom />
        ) : null}
      </div>
    </>
  );
};
