import React, { useContext, useState } from "react";
import { FormContextRegister } from "../RegisterForm";
import { Box, Button, Typography } from "@mui/material";
import OtpInput from "react18-input-otp";
import { useQueryClient, useMutation } from 'react-query';
import { setRegister } from "../../../../redux/reducer";
import { useFormik } from 'formik';
import { sendOtp } from "../../../../lib/helper";
import Toast from "../../../atoms/Toast";
import { FaSpinner } from "react-icons/fa";
import {useSelector, useDispatch} from 'react-redux';
import LoadingButton from "../../../atoms/Loader/LoadingButton";


function Otp() {
    const { activeStep, setActiveStep, formData, setFormData, handleComplete } = useContext(FormContextRegister);
    const [state, setState] = useState({type: 0, message: ''});
	const [otp, setOtp] = useState("");
    const client = useSelector((state) => state.app.client);
	const dispatch = useDispatch();

    const sendOtpMutation = useMutation(sendOtp,  {
        onSuccess: (res) => {
            console.log("res otp", res);
            if(res.code == "OTP_VERIFICATION_FAILED") {
                setState({type: 2, message: res.description})
                setTimeout(() => {
                    setState({ type: 0, message: "" })
                }, 3000);
            } else {
                setState({type: 1, message: "OTP exact"})
                dispatch(setRegister({...client.register, emailVerificationToken: res.emailVerificationToken}))
                handleComplete()
            };
        }
    });

    const onSubmit = async (values) => {
        if (Object.keys(values).length == 0) return console.log("Pas de données");
        sendOtpMutation.mutate({email: client.register.email, otpCode: parseInt(otp)})
    };

    const closeToast = () => {
		setState({ type: 0, message: "" })
	}

    // Formik hook
    const formik = useFormik({
        initialValues: {
            otpCode: otp
        },
        onSubmit
    })

    const handleChange = (enteredOtp) => {
		setOtp(enteredOtp);
	};

    return (
        <>
            {state.type > 0 ? state.type == 2 ? <Toast type={"danger"} message={state.message} close={closeToast}/> : (state.type == 1 ? <Toast type={"success"} message={state.message} close={closeToast}/> : <></>) : <></>}

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
            <form id="signupform" onSubmit={formik.handleSubmit}>
                <div className="form-text code">

                    <OtpInput
                        value={otp}
                        onChange={handleChange}
                        numInputs={6}
                        isInputNum
                        name="otp"
                    />
                </div>

                <div className="form-text text-holder">
                    <span className="text-only">
                        Pas réçu de code ? Renvoyer le code
                    </span>
                </div>

                <div className="form-button">
                    <Button size="large" variant="contained" type="submit">
                        {sendOtpMutation.isLoading ? <LoadingButton /> : 'NEXT STEP'}
                    </Button>
                </div>
            </form>
        </>
    );
}

export default Otp;
