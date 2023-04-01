import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@mui/material/styles";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { QueryClientProvider, QueryClient } from 'react-query'
import { theme } from "../theme";
import '../i18n';

import "../styles/globals.css";
import "../styles/main.css";
import "formik-stepper/dist/style.css";

const queryClient = new QueryClient()


export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Payé les soins à vos familles depuis l'étranger"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.png" />
        <script src="https://unpkg.com/flowbite@1.5.3/dist/flowbite.js"></script>
      </Head>
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <NextNProgress height={3} color="#FE8023" />
            <ThemeProvider theme={theme}>
              {getLayout(<Component {...pageProps} />)}
            </ThemeProvider>
          </Provider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}
