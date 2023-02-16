import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { theme } from "../theme";

import "../styles/globals.css";
import "../styles/main.css";

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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SessionProvider session={pageProps.session}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <main className="bg-[#FFFFFF]">
            {getLayout(<Component {...pageProps} />)}
          </main>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}
