import Head from "next/head";

//* components *//
import { NavTopSettings } from "../components/navbar";
import { DesktopSidebar, RightSidebar } from "../components/sidebar";

//* interface *//
interface Props {
  button?: boolean;
  buttonOnClick?: any;
  buttonText?: string;
  children?: React.ReactNode;
  description?: string;
  explore?: boolean;
  navText: string;
  title: string;
}

export const SettingLayout: React.FC<Props> = ({
  button = false,
  buttonOnClick,
  buttonText,
  children,
  description,
  explore = false,
  navText,
  title,
}) => {
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
          <NavTopSettings
            button={button}
            navText={navText}
            buttonOnClick={buttonOnClick}
            buttonText={buttonText}
          />
          {children}
        </main>
        <RightSidebar />
      </div>
    </>
  );
};
