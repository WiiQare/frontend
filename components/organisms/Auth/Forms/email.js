import React, { useContext } from "react";
import { FormContextRegister } from "../RegisterForm";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

function Email() {
    const { activeStep, setActiveStep, formData, setFormData, handleComplete } = useContext(FormContextRegister);

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
            <form id="signupform" onSubmit={handleComplete}>
                <Stack spacing={2}>
                    <TextField
                        id="outlined-basic"
                        fullWidth
                        label="E-mail Address"
                        variant="outlined"
                    />

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
