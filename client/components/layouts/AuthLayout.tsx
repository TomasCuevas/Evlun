import Head from "next/head";

//* interface *//
interface Props {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const AuthLayout: React.FC<Props> = ({
  title,
  description,
  children,
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
      <main className="flex min-h-screen flex-col items-center bg-bluedark px-[5%]">
        <div className="max-w-[450px]">{children}</div>
      </main>
    </>
  );
};
