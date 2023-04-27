import Head from "next/head";
import { useRouter } from "next/router";

//* components *//
import { DesktopSidebar, RightSidebar } from "@/components/sidebar";
import { FullLoader } from "@/components/ui";
import { NavbarTop } from "@/components/navbar";

//* store *//
import { useAuthStore, useRightSidebarStore } from "@/store";
import { useEffect } from "react";

//* interface *//
interface Props {
  children?: React.ReactNode;
  description?: string;
  title: string;
}

export const SettingLayout: React.FC<Props> = ({
  children,
  description,
  title,
}) => {
  const { isAuthenticated } = useAuthStore();
  const { onChangeSidebarItems } = useRightSidebarStore();

  const { replace } = useRouter();

  useEffect(() => {
    onChangeSidebarItems({ explorer: false, profile: false, relevant: false });
  }, []);

  if (isAuthenticated === "no-authenticated") replace("/auth/login");
  if (isAuthenticated === "authenticated") {
    return (
      <>
        <Head>
          <title>{title}</title>
          <meta
            name="description"
            content={description ? description : "descripcion del sitio"}
          />
        </Head>

        <div className="flex min-h-[calc(100vh_+_10px)] flex-col justify-center bg-background xs:flex-row">
          <DesktopSidebar />
          <main className="min-h-[calc(100vh_+_10px)] w-full max-w-[600px] border-orange sm:border-r">
            <NavbarTop />
            {children}
          </main>
          <RightSidebar />
        </div>
      </>
    );
  }

  return <FullLoader />;
};
