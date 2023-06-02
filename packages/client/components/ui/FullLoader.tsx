import Head from "next/head";

export const FullLoader = () => {
  return (
    <>
      <Head>
        <title>Cargando...</title>
      </Head>
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <span className="h-14 w-14 animate-spin rounded-full  border-t-[6px] border-r border-t-orange border-r-[#0000]"></span>
      </div>
    </>
  );
};
