import React, { useContext, useState, useReducer } from "react";
import { FormContextRegister } from "../RegisterForm";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from 'formik';
import { emailValidate } from "../../../../lib/validate";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { sendEmail } from "../../../../lib/helper";
import { useQueryClient, useMutation } from 'react-query';
import {useSelector, useDispatch} from 'react-redux';
import { setEmail } from "../../../../redux/reducer";
import Toast from "../../../atoms/Toast";

import { FaSpinner } from "react-icons/fa";

function Email() {
    const { activeStep, setActiveStep, handleComplete } = useContext(FormContextRegister);
    const [state, setState] = useState({type: 0, message: ''});
    const email = useSelector((state) => state.app.client.email);
	const dispatch = useDispatch();


    const sendEmailMutation = useMutation(sendEmail,  {
        onSuccess: (res) => {
            if(res.status == 200 || res.status == 201) {
                setState({type: 1, message: "Email sent successfully"})
                handleComplete()
            } else {
                setState({type: 2, message: "Error while sending OTP Code"})
            };
        }
    });

    const onSubmit = async (values) => {
        if (Object.keys(values).length == 0) return console.log("Pas de données");
        dispatch(setEmail(values))
        sendEmailMutation.mutate(values)
    };

    // Formik hook
    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validate: emailValidate,
        onSubmit
    })

    return (
        <>
            
            {state.type > 0 ? state.type == 2 ? <Toast type={"danger"} message={state.message}/> : (state.type == 1 ? <Toast type={"success"} message={state.message}/> : <></>) : <></>}


            <Box sx={{ mb: 2, mt: 2, textAlign: "left" }}>
                <Typography color="primary" variant="body1">
                    Entrez votre email
                </Typography>
            </Box>
            <form id="signupform" onSubmit={formik.handleSubmit}>
                <Stack spacing={2}>
                    <div className="space-y-1">
                        <TextField
                            id="outlined-basic"
                            fullWidth
                            label="E-mail Address"
                            variant="outlined"
                            name="email"
                            {...formik.getFieldProps('email')} 
                        />
                        {formik.errors.email && formik.touched.email ? <span className="flex items-center gap-1 text-rose-500 text-left text-xs px-1"><HiOutlineInformationCircle /><span>{formik.errors.email}</span></span> : <></>}
                    </div>

                    <div className="form-button">
                        <Button size="large" variant="contained" type="submit">

                            {sendEmailMutation.isLoading ? <FaSpinner icon="spinner" className="spinner" /> : 'NEXT STEP'}
                        </Button>
                    </div>
                </Stack>
            </form>
        </>
    );
}

export default Email;