import Logo from "../components/atoms/LogoHeader";
import WelcomeSlider from "../components/molecules/WelcomeSlider";
import RegisterForm from "../components/organisms/Auth/RegisterForm";
import { REGISTER_SLIDES } from "../utils/constants";
import { useMediaQuery, CssBaseline } from "@mui/material";
import Head from "next/head";
import React from "react";
import {useSelector} from 'react-redux';

function Register() {
  const matches = useMediaQuery("(max-width: 992px)");
  const state = useSelector((state) => state);

  return (
    <>
      <Head>
        <title>Wiiqare | Register</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
          integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N"
          crossOrigin="anonymous"
        />
      </Head>
   <CssBaseline />
      <div id="form-section" className="container-fluid signup">
        <Logo />
        <div className="row">
          {!matches && <WelcomeSlider slides={REGISTER_SLIDES} />}
          <RegisterForm />
        </div>
      </div>
    </>
  );
}

export default Register;
