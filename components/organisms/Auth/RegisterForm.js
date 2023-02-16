import React from "react";
import Link from "next/link";

import {
  IconButton,
  InputAdornment,
  StepLabel,
  TextField,
  Typography,
  OutlinedInput,
  FormControl,
  useMediaQuery,
  Button,
  Stack,
  InputLabel,
  Divider,
} from "@mui/material";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import OtpInput from "react18-input-otp";
import MuiPhoneNumber from "material-ui-phone-number";
import OnboardingScreen from "../../molecules/OnboardingScreen";
import MenuHolder from "../../atoms/MenuHolder";
import BlinkSnackbar from "../../atoms/BlinkSnackbar";

const steps = [
  "Votre adresse email",
  "Vérification de l'email",
  "Information personnel",
];

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 11,
    left: "calc(-50% + 12px)",
    right: "calc(50% + 12px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 4,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#f0f4fd",
    borderRadius: 1,
  },
}));

function RegisterForm() {
  const matches = useMediaQuery("(max-width: 992px)");
  const [onboardingIsEnd, setOnboardingIsEnd] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [otp, setOtp] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChange = (enteredOtp) => {
    setOtp(enteredOtp);
  };

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const formSteps = {
    fromStep1: (
      <>
        {/*  <div className="form-title">
          Allons-y ! <br /> Rejoignez notre plateforme...
        </div> */}
        <Box sx={{ mb: 2, mt: 2, textAlign: "left" }}>
          <Typography color="primary" variant="body1">
            Entrez votre email
          </Typography>
        </Box>
        <form id="signupform">
          <Stack spacing={2}>
            <TextField
              id="outlined-basic"
              fullWidth
              label="E-mail Address"
              variant="outlined"
            />

            <div className="form-button">
              <Button size="large" variant="contained" onClick={handleComplete}>
                NEXT STEP
              </Button>
            </div>
          </Stack>
        </form>
      </>
    ),
    fromStep2: (
      <>
        {/* <div className="form-title">Vérifier votre adresse e-mail</div> */}
        <Box sx={{ mb: 2, mt: 2, textAlign: "left" }}>
          <Typography color="primary" variant="body1">
            Un code vous a été envoyé, verifiez votre email
          </Typography>
        </Box>
        <Box sx={{ mb: 1, textAlign: "left" }}>
          <Typography color="text.secondary" variant="caption">
            Expire in 00:54
          </Typography>
        </Box>
        <form id="signupform">
          <div className="form-text code">
            {/*  <input
              type="text"
              name="username"
              placeholder="Code de confirmation"
              required
            /> */}
            <OtpInput
              value={otp}
              onChange={handleChange}
              numInputs={4}
              isInputNum
            />
          </div>

          <div className="form-text text-holder">
            <span className="text-only">
              Pas réçu de code ? Renvoyer le code
            </span>
          </div>

          <div className="form-button">
            <Button size="large" variant="contained" onClick={handleComplete}>
              NEXT STEP
            </Button>
          </div>
        </form>
      </>
    ),
    fromStep3: (
      <>
        {/* <div className="form-title">Information personnel</div> */}
        <Box sx={{ mb: 2, mt: 2, textAlign: "left" }}>
          <Typography color="primary" variant="body1">
            Information personnel
          </Typography>
        </Box>
        <form id="signupform">
          <Stack spacing={1.5}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <TextField
                id="outlined-basic"
                fullWidth
                label="First name"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                fullWidth
                label="Last name"
                variant="outlined"
              />
            </Stack>
            <MuiPhoneNumber
              fullWidth
              label="Phone number"
              onChange={() => {}}
              variant="outlined"
              defaultCountry={"fr"}
            />
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-basic1">Password</InputLabel>
              <OutlinedInput
                id="outlined-basic1"
                label="Password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            {/*  <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-basic2">
                Confirm password
              </InputLabel>
              <OutlinedInput
                id="outlined-basic2"
                label="Confirm password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl> */}
            <div className="form-text text-holder">
              {/*  <span className="text-only">
                    Preferred method of payment.
                  </span> */}
              <input
                type="radio"
                name="pmethod"
                className="hno-radiobtn"
                id="rad1"
              />
              <label htmlFor="rad1">
                By clicking , you agree to our Terms and Conditions
              </label>
              {/*   <input
                    type="radio"
                    name="pmethod"
                    className="hno-radiobtn"
                    id="rad2"
                  />
                  <label htmlFor="rad2">Credit Card</label> */}
            </div>
            <Box>
              <Link href={"/"}>
                <Button size="large" variant="contained" onClick={() => {}}>
                  CREATE NEW ACCOUNT
                </Button>
              </Link>
            </Box>
          </Stack>
        </form>
      </>
    ),
  };
  return (
    <>
      <div className="form-holder">
        <MenuHolder href="/login" label="SIGN IN" />
        <div className="signin-signup-form">
          <Stack
            sx={{ mb: 2, mt: 2, width: "100%" }}
            justifyContent="center"
            alignItems="center"
          >
            <Stepper
              sx={{ maxWidth: 450, width: "100%" }}
              alternativeLabel
              activeStep={activeStep}
              connector={<ColorlibConnector />}
            >
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepLabel color="inherit" onClick={handleStep(index)}>
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Stack>

          <div className="form-items">
            {/* <Divider /> */}
            {Object.values(formSteps)[activeStep]}
          </div>
        </div>
      </div>
      <BlinkSnackbar />
    </>
  );
}

export default RegisterForm;
