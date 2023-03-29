import React, { useContext, useState } from "react";
import { FormContextRegister } from "../RegisterForm";
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import MuiPhoneNumber from "material-ui-phone-number";
import {useSelector, useDispatch} from 'react-redux';
import { useQueryClient, useMutation } from 'react-query';
import { useFormik } from 'formik';
import { register } from "../../../../lib/helper";
import Toast from "../../../atoms/Toast";
import { FaSpinner } from "react-icons/fa";
import { useRouter } from 'next/router'
import { setRegister } from "../../../../redux/reducer";


function Information() {
    const { activeStep, setActiveStep, formData, setFormData, handleComplete } = useContext(FormContextRegister);
	const [showPassword, setShowPassword] = useState(false);
    const [state, setState] = useState({type: 0, message: ''});
    const client = useSelector((state) => state.app.client);
    const router = useRouter();
	const dispatch = useDispatch();


	const handleClickShowPassword = () => setShowPassword((show) => !show);

    const newAccountMutation = useMutation(register,  {
        onSuccess: (res) => {

            if(res.code) {
                setState({type: 2, message: res.message ?? res.description})
            } else {
                setState({type: 1, message: "Successfully registered"})
                dispatch(setRegister({}))
                
                setTimeout(() => {
                    router.push('/login')
                }, 2500);

            };
        }
    });

    const onSubmit = async (values) => {
        if (Object.keys(values).length == 0) return console.log("Pas de données");
        //dispatch(setRegsiter({...values}))
        console.log(values, client.register);
        newAccountMutation.mutate({...values, ...client.register})
    };

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            password: '',
            phoneNumber: '',
            country: '',
        },
        onSubmit
    })

    return (
        <>

        {state.type > 0 ? state.type == 2 ? <Toast type={"danger"} message={state.message}/> : (state.type == 1 ? <Toast type={"success"} message={state.message}/> : <></>) : <></>}

        <Box sx={{ mb: 2, mt: 2, textAlign: "left" }}>
            <Typography color="primary" variant="body1">
                Information personnel
            </Typography>
        </Box>
        <form id="signupform" onSubmit={formik.handleSubmit}>
            <Stack spacing={1.5}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                    <TextField
                        id="outlined-basic"
                        fullWidth
                        label="First name"
                        variant="outlined"
                        name="firstName"
                        {...formik.getFieldProps('firstName')}
                    />
                    <TextField
                        id="outlined-basic"
                        fullWidth
                        label="Last name"
                        variant="outlined"
                        name="lastname"
                        {...formik.getFieldProps('lastName')}
                    />
                </Stack>
                <MuiPhoneNumber
                    fullWidth
                    label="Phone number"
                    variant="outlined"
                    onChange={(value, country) => {formik.setFieldValue("phoneNumber", value); formik.setFieldValue("country", country.countryCode)}}
                    
                    defaultCountry={"fr"}
                    name="phoneNumber"
                />

                <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-basic1">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-basic1"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        {...formik.getFieldProps('password')}
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
                    <Button size="large" variant="contained" type="submit">
                        {newAccountMutation.isLoading ? <FaSpinner icon="spinner" className="spinner" /> : 'CREATE NEW ACCOUNT'}
                    </Button>
                </Box>
            </Stack>
        </form>
    </>
    );
}

export default Information;
