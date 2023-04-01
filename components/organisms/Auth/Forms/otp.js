import React, { useContext, useState } from "react";
import { FormContextRegister } from "../RegisterForm";
import { Box, Button, Typography } from "@mui/material";
import OtpInput from "react18-input-otp";
import { useQueryClient, useMutation } from 'react-query';
import { setRegister } from "../../../../redux/reducer";
import { useFormik } from 'formik';
import { sendEmail, sendOtp } from "../../../../lib/helper";
import Toast from "../../../atoms/Toast";
import { FaSpinner } from "react-icons/fa";
import {useSelector, useDispatch} from 'react-redux';
import LoadingButton from "../../../atoms/Loader/LoadingButton";
import Countdown from 'react-countdown';

function Otp() {
    const { activeStep, setActiveStep, formData, setFormData, handleComplete } = useContext(FormContextRegister);
    const [state, setState] = useState({type: 0, message: ''});
	const [otp, setOtp] = useState("");
	const [resend, setResend] = useState(false);
    const client = useSelector((state) => state.app.client);
	const dispatch = useDispatch();


    const sendOtpMutation = useMutation(sendOtp,  {
        onSuccess: (res) => {
            console.log(res);
            if(res.code) {
                setState({type: 2, message: res.description ?? res.message});
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

        if(enteredOtp.length == 6) onSubmit({ otpCode: enteredOtp })
	};

    const sendEmailMutation = useMutation(sendEmail,  {
        onSuccess: (res) => {

            if(res.status == 200 || res.status == 201) {
                setState({type: 1, message: "Email sent successfully"})
                setResend(false)
            } else {
                setState({type: 2, message: "Error while sending OTP Code"})
                setTimeout(() => {
                    setState({ type: 0, message: "" })
                    setResend(false)
                }, 3000);
            };
        }
    });

    const resendCode = async () => {
        setResend(true)
        sendEmailMutation.mutate({email: client.register.email})
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
                <Countdown
                    date={Date.now() + 120000}
                    renderer={renderer}
                />
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
                        Pas réçu de code ? <button type="button" className="text-primary" onClick={() => resendCode()}>{resend ? 'En cours de renvoi...' : 'Renvoyer le code'}</button>    
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

const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (<>Expire in <span>{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span></>);
    }
  };

  const Completionist = () => <span>Code OTP expiré</span>;
