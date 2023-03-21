import Logo from "../../components/atoms/LogoHeader";
import WelcomeSlider from "../../components/molecules/WelcomeSlider";
import { LOGIN_SLIDES } from "../../utils/constants";
import { useMediaQuery, CssBaseline } from "@mui/material";
import Head from "next/head";
import React from "react";
import ResetForm from "../../components/organisms/Auth/ResetForm";

function Reset() {
  const matches = useMediaQuery("(max-width: 992px)");
  return (
    <>
      <Head>
        <title>WiiQare | Forgot Password</title>
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
          <ResetForm />
        </div>
      </div>
    </>
  );
}

export default Reset;
