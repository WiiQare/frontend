import { SessionProvider } from "next-auth/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { theme } from "../theme";

import "../styles/globals.css";
import "../styles/main.css";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <CssBaseline  />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}
