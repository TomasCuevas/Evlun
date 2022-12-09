import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

//* providers *//
import { AuthProvider } from "../context/AuthContext";
import { UIProvider } from "../context/UIContext";
import { DataProvider } from "../context/DataContext";

//* styles *//
import "../styles/globals.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools /> */}
      <AuthProvider>
        <UIProvider>
          <DataProvider>
            <Component {...pageProps} />
          </DataProvider>
        </UIProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
