import React, { useState, createContext, useEffect } from "react";
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
import Drawer from "../components/molecules/Navbar/Drawer";

const queryClient = new QueryClient();
export const DrawContext = createContext();

const App = ({ Component, pageProps }) => {
  const [draw, setDraw] = useState(false);
  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    import('preline')
  }, [])
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
              <DrawContext.Provider value={{draw, setDraw}}>
                {draw ? <Drawer /> : <></>}
                {getLayout(<Component {...pageProps} />)}
              </DrawContext.Provider>
            </ThemeProvider>
          </Provider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}

export default App;