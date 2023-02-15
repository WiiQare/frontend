import React from "react";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import OnboardingScreen from "../molecules/OnboardingScreen";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import MenuHolder from "../atoms/MenuHolder";
import BlinkSnackbar from "../atoms/BlinkSnackbar";

function LoginForm() {
  const matches = useMediaQuery("(max-width: 992px)");
  const [onboardingIsEnd, setOnboardingIsEnd] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  React.useEffect(() => {
    setOnboardingIsEnd(localStorage.getItem("onboardingIsEnd") || "");
  }, []);

  const formHolder = (
    <>
      <div className="form-holder">
        <MenuHolder href="/register" label="SIGN UP" />
        <div className="signin-signup-form">
          <div className="form-items">
            <div className="form-title">Sign in to your account</div>
            <Box sx={{ mb: 3, mt: 2 }}></Box>
            <form id="signinform">
              <Stack spacing={2}>
                <TextField
                  id="outlined-basic"
                  fullWidth
                  label="E-mail Address"
                  variant="outlined"
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
                <Box sx={{ textAlign: "right", mb: 2 }}>
                  <Typography color="text.secondary" variant="caption">
                    Forgot your password ?
                  </Typography>
                </Box>
                <Box>
                  <Button
                    size="large"
                    variant="contained"
                    onClick={() => {}}
                    className="bg-yellow"
                  >
                    SIGN IN
                  </Button>
                </Box>
              </Stack>
            </form>
          </div>
        </div>
      </div>
      <BlinkSnackbar />
    </>
  );
  return (
    <>
      {matches && !onboardingIsEnd ? (
        <OnboardingScreen
          onStartClick={() => {
            if (typeof window !== "undefined") {
              localStorage.setItem("onboardingIsEnd", "onboardingIsEnd");
            }
            setOnboardingIsEnd("onboardingIsEnd");
          }}
        />
      ) : (
        formHolder
      )}
    </>
  );
}

export default LoginForm;
