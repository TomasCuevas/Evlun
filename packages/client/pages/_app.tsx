import { useEffect } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

//* stores *//
import { useAuthStore, usePostsStore, useUserStore } from "@/store";

//* styles *//
import "../styles/globals.css";
import "../styles/editor.css";
import "../styles/post.css";

//* query client *//
export const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const { isAuthenticated, onChecking } = useAuthStore();
  const { onGetSavedPostsList } = usePostsStore();
  const { userUpdated, clearUser } = useUserStore();
  const { pathname } = useRouter();

  useEffect(() => {
    onChecking();
  }, []);

  useEffect(() => {
    onGetSavedPostsList();
  }, [isAuthenticated]);

  useEffect(() => {
    if (pathname !== "/profile/[username]" && userUpdated) clearUser();
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Head>
        <link rel="shortcut icon" href="/evlun-logo.svg" type="image/x-icon" />
      </Head>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
