import { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

//* providers *//
import {
  AuthProvider,
  UIProvider,
  DataProvider,
  RightSidebarProvider,
} from "../context";

//* styles *//
import "../styles/globals.css";
import "../styles/editor.css";
import "../styles/post.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <AuthProvider>
        <UIProvider>
          <RightSidebarProvider>
            <DataProvider>
              <Head>
                <link
                  rel="shortcut icon"
                  href="/evlun-logo.svg"
                  type="image/x-icon"
                />
              </Head>
              <Component {...pageProps} />
            </DataProvider>
          </RightSidebarProvider>
        </UIProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
