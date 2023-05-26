import Head from "next/head";
import { useRouter } from "next/router";

//* components *//
import { FullLoader } from "@/components/ui";

//* store *//
import { useAuthStore } from "@/store";

//* interface *//
interface Props {
  children: React.ReactNode;
  description?: string;
  title: string;
}

export const AuthLayout: React.FC<Props> = ({
  children,
  description,
  title,
}) => {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  if (isAuthenticated === "authenticated") router.replace("/");
  if (isAuthenticated !== "no-authenticated") return <FullLoader />;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={description ? description : "descripcion del sitio"}
        />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-background px-[5%]">
        <div className="max-w-[450px]">{children}</div>
      </main>
    </>
  );
};
