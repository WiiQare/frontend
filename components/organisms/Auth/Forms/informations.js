import React, { useContext, useState } from "react";
import { FormContextRegister } from "../RegisterForm";
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import MuiPhoneNumber from "material-ui-phone-number";
import { useSelector, useDispatch } from 'react-redux';
import { useQueryClient, useMutation } from 'react-query';
import { ErrorMessage, useFormik } from 'formik';
import { register } from "../../../../lib/helper";
import Toast from "../../../atoms/Toast";
import { FaSpinner } from "react-icons/fa";
import { useRouter } from 'next/router'
import { setRegister } from "../../../../redux/reducer";
import LoadingButton from "../../../atoms/Loader/LoadingButton";
import * as yup from "yup";
import { HiOutlineInformationCircle } from "react-icons/hi";


function Information() {
    const { activeStep, setActiveStep, formData, setFormData, handleComplete } = useContext(FormContextRegister);
    const [showPassword, setShowPassword] = useState(false);
    const [showcPassword, setShowcPassword] = useState(false);
    const [term, setTerm] = useState(false);
    const [state, setState] = useState({ type: 0, message: '' });
    const client = useSelector((state) => state.app.client);
    const router = useRouter();
    const dispatch = useDispatch();


    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowcPassword = () => setShowcPassword((show) => !show);

    const newAccountMutation = useMutation(register, {
        onSuccess: (res) => {

            if (res.code) {
                setState({ type: 2, message: res.message ?? res.description })
                setTimeout(() => {
                    setState({ type: 0, message: "" })
                }, 3000);

            } else {
                setState({ type: 1, message: "Successfully registered" })
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

        let {confirm_password, ...info} = values;
        newAccountMutation.mutate({ ...info, ...client.register })
    };

    const closeToast = () => {
		setState({ type: 0, message: "" })
	}

    const ValidationSchema = yup.object().shape({
		firstName: yup.string().required("Fistname is a required field"),
		lastName: yup.string().required("Lastname is a required field"),
		phoneNumber: yup.string().required("Phone number is a required field"),
		country: yup.string().required(),
		password: yup.string().required("Password is a required field"),
        confirm_password: yup.string().required("Please confirm your password").oneOf([yup.ref('password'), null], 'Passwords must match'),
	});

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            password: '',
            phoneNumber: '',
            country: '',
            confirm_password: '',
        },
        validationSchema: ValidationSchema,
        onSubmit
    })

    const renderError = (message) => (
		<p className="text-xs text-red-600 font-light flex items-center gap-1 px-1">{message}</p>
	);

    return (
        <>

            {state.type > 0 ? state.type == 2 ? <Toast type={"danger"} message={state.message} close={closeToast} /> : (state.type == 1 ? <Toast type={"success"} message={state.message} close={closeToast} /> : <></>) : <></>}

            <Box sx={{ mb: 2, mt: 2, textAlign: "left" }}>
                <Typography color="primary" variant="body1">
                    Information personnel
                </Typography>
            </Box>
            <form id="signupform" onSubmit={formik.handleSubmit}>
                <Stack spacing={1.5}>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                        <div className="flex flex-col gap-1">
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                label="First name"
                                variant="outlined"
                                name="firstName"
                                {...formik.getFieldProps('firstName')}
                            />
					        
                            {formik.errors.firstName ?  renderError(formik.errors.firstName): <></>}
                        </div>

                        <div className="flex flex-col gap-1">

                            <TextField
                                id="outlined-basic"
                                fullWidth
                                label="Last name"
                                variant="outlined"
                                name="lastName"
                                {...formik.getFieldProps('lastName')}
                            />
                            {formik.errors.lastName ?  renderError(formik.errors.lastName): <></>}

                        </div>

                    </Stack>

                    <div className="flex flex-col gap-1">
                        <MuiPhoneNumber
                            fullWidth
                            label="Phone number"
                            variant="outlined"
                            onChange={(value, country) => { formik.setFieldValue("phoneNumber", value); formik.setFieldValue("country", country.countryCode) }}

                            defaultCountry={"fr"}
                            name="phoneNumber"
                        />
                        {formik.errors.phoneNumber ?  renderError(formik.errors.phoneNumber): <></>}
                    </div>


                    <div className="flex flex-col gap-1">

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
                        {formik.errors.password ?  renderError(formik.errors.password): <></>}
                        
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-basic2">
                                Confirm password
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-basic2"
                                label="Confirm password"
                                name="confirm_password"
                                type={showcPassword ? "text" : "password"}
                                {...formik.getFieldProps('confirm_password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowcPassword}
                                            edge="end"
                                        >
                                            {showcPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />

                        </FormControl>
                        {formik.errors.confirm_password ?  renderError(formik.errors.confirm_password): <></>}
                    </div>
                    

                    <div className="flex items-center !mt-10 mb-2">
                        <input id="link-checkbox" type="checkbox" value="" className="w-4 h-4 text-orange bg-gray-100 border-gray-300 rounded focus:ring-orange focus:ring-1" onChange={(e) => setTerm(e.target.checked)}/>
                        <label for="link-checkbox" className="h-4 ml-2 text-sm font-normal text-gray-600 dark:text-gray-300">I agree with the <a href="#" className="text-primary hover:underline">terms and conditions</a>.</label>
                    </div>

                    <Box>
                        <Button size="large" variant="contained" type="submit" className="disabled:bg-gray-200" disabled={!term}>
                            {newAccountMutation.isLoading ? <LoadingButton /> : 'CREATE NEW ACCOUNT'}
                        </Button>
                    </Box>
                </Stack>
            </form>
        </>
    );
}

export default Information;
