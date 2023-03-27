import React, { useContext, useState } from "react";
import { FormContextRegister } from "../RegisterForm";
import { Box, Button, Typography } from "@mui/material";
import OtpInput from "react18-input-otp";

function Otp() {
    const { activeStep, setActiveStep, formData, setFormData, handleComplete } = useContext(FormContextRegister);
	const [otp, setOtp] = useState("");

    const handleChange = (enteredOtp) => {
		setOtp(enteredOtp);
	};

    return (
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
    );
}

export default Otp;
