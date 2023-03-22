import Logo from "../components/atoms/LogoHeader";
import WelcomeSlider from "../components/molecules/WelcomeSlider";
import LoginForm from "../components/organisms/Auth/LoginForm";
import { LOGIN_SLIDES } from "../utils/constants";
import { useMediaQuery, CssBaseline } from "@mui/material";
import Head from "next/head";
import React from "react";
import { useTranslation, Trans } from 'react-i18next';

function Login() {
  const matches = useMediaQuery("(max-width: 992px)");
  const { t, i18n } = useTranslation();
  return (
    <>
      <Head>
        <title>Wiiqare | Login</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
          integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N"
          crossOrigin="anonymous"
        />
      </Head>
      <CssBaseline />
      <div id="form-section" className="container-fluid signin">
        <Logo />
        <div className="row">
          {!matches && <WelcomeSlider slides={LOGIN_SLIDES} />}
          <LoginForm />
        </div>
      </div>
    </>
  );
}

export default Login;
