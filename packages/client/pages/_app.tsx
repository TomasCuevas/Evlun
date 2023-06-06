import { useEffect } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

//* stores *//
import { useAuthStore, usePostsStore } from "@/store";

//* styles *//
import "../styles/globals.css";
import "../styles/editor.css";
import "../styles/post.css";

//* query client *//
export const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const { isAuthenticated, onChecking } = useAuthStore();
  const { onGetSavedPostsList } = usePostsStore();

  useEffect(() => {
    onChecking();
  }, []);

  useEffect(() => {
    onGetSavedPostsList();
  }, [isAuthenticated]);

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
