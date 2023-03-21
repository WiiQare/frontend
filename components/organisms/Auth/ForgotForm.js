import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import { signIn } from "next-auth/react"

import OnboardingScreen from "../../molecules/OnboardingScreen";
import MenuHolder from "../../atoms/MenuHolder";
import BlinkSnackbar from "../../atoms/BlinkSnackbar";

function ForgotForm() {
	const matches = useMediaQuery("(max-width: 992px)");
	const [onboardingIsEnd, setOnboardingIsEnd] = React.useState("");


	React.useEffect(() => {
		setOnboardingIsEnd(localStorage.getItem("onboardingIsEnd") || "");
	}, []);


	const formHolder = (
		<>
			<div className="form-holder">
				<MenuHolder href="/register" label="SIGN UP" />
				<div className="signin-signup-form">
					<div className="flex flex-col md:w-3/4 w-full border-opacity-50 gap-4">
						
						<div className="form-items !w-full !max-w-full flex flex-col items-center mx-auto">
							<div className="md:w-3/4 mx-auto">
								<div className="form-title">Forgot Password</div>
								<Box sx={{ mb: 3, mt: 2 }}></Box>
								<form id="signinform" className="">
									<Stack spacing={2}>
										<TextField
											id="outlined-basic"
											fullWidth
											label="E-mail Address"
											variant="outlined"
										/>
										
										<Box>
											<Button
												size="large"
												variant="contained"
												onClick={() => { }}
												className="bg-yellow"
											>
												SEND
											</Button>
										</Box>
									</Stack>
								</form>
							</div>
						</div>

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

export default ForgotForm;
