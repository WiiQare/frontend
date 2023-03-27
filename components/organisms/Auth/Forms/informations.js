import React, { useContext, useState } from "react";
import { FormContextRegister } from "../RegisterForm";
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import MuiPhoneNumber from "material-ui-phone-number";

function Information() {
    const { activeStep, setActiveStep, formData, setFormData, handleComplete } = useContext(FormContextRegister);
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
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
                    onChange={() => { }}
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
                        required
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
                        <Button size="large" variant="contained" onClick={() => { }}>
                            CREATE NEW ACCOUNT
                        </Button>
                    </Link>
                </Box>
            </Stack>
        </form>
    </>
    );
}

export default Information;
