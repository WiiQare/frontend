import React, { useContext, useState } from "react";
import { FormContextRegister } from "../RegisterForm";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from 'formik';
import { emailValidate } from "../../../../lib/validate";
import { HiOutlineInformationCircle } from "react-icons/hi";

function Email() {
    const { activeStep, setActiveStep, formData, setFormData, handleComplete } = useContext(FormContextRegister);

    const onSubmit = async (values) => {
        console.log(values);
        handleComplete();
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
            {/*  <div className="form-title">
          Allons-y ! <br /> Rejoignez notre plateforme...
        </div> */}
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
                            NEXT STEP
                        </Button>
                    </div>
                </Stack>
            </form>
        </>
    );
}

export default Email;
