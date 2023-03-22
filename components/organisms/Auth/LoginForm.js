import React from "react";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { signIn } from "next-auth/react"

import OnboardingScreen from "../../molecules/OnboardingScreen";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import {
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Typography,
} from "@mui/material";
import MenuHolder from "../../atoms/MenuHolder";
import BlinkSnackbar from "../../atoms/BlinkSnackbar";
import Image from "next/image";

function LoginForm() {
	const matches = useMediaQuery("(max-width: 992px)");
	const [onboardingIsEnd, setOnboardingIsEnd] = React.useState("");
	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	React.useEffect(() => {
		setOnboardingIsEnd(localStorage.getItem("onboardingIsEnd") || "");
	}, []);

	//Handle Google Login
    const handleGoogleSignIn = async () => {
        //signIn('google', {callbackUrl: "http://localhost:3000"})
        signIn('google', {callbackUrl: "https://wiiqare-unicef-ii.vercel.app"})

    }

	const handleLinkedInSignIn = async () => {
        //signIn('linkedin', {callbackUrl: "http://localhost:3000"})
        signIn('linkedin', {callbackUrl: "https://wiiqare-unicef-ii.vercel.app"})
    }

	const formHolder = (
		<>
			<div className="form-holder">
				<MenuHolder href="/register" label="SIGN UP" />
				<div className="signin-signup-form">
					<div className="flex flex-col md:w-3/4 w-full border-opacity-50 gap-4">
						
						<div className="form-items !w-full !max-w-full flex flex-col items-center mx-auto">
							<div className="md:w-3/4 mx-auto">
								<div className="form-title">Sign in to your account</div>
								<Box sx={{ mb: 3, mt: 2 }}></Box>
								<form id="signinform" className="">
									<Stack spacing={2}>
										<TextField
											id="outlined-basic"
											fullWidth
											label="E-mail Address"
											variant="outlined"
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
										<Box sx={{ textAlign: "right", mb: 2 }}>
											<Typography color="text.secondary" variant="caption">
												<Link href={"/forgot/password"} legacyBehavior>
													<a>
														Forgot your password ?
													</a>
												</Link>
											</Typography>
										</Box>
										<Box>
											<Button
												size="large"
												variant="contained"
												onClick={() => { }}
												className="bg-yellow"
											>
												SIGN IN
											</Button>
										</Box>
									</Stack>
								</form>
							</div>
						</div>

						<div className="divider"><span className="text-gray-400">OR</span></div>

						<div className="flex flex-col md:flex-row gap-4 mb-2">
							<button type="button" className="w-full py-3 flex justify-center items-center gap-4 hover:bg-gray-200 rounded-xl border font-medium" onClick={handleGoogleSignIn}><Image src={"/images/google.svg"} width="20" height="20" alt="Google logo" /> Sign In with Google</button>
							<button type="button" className="w-full py-3 flex justify-center items-center gap-4 hover:bg-gray-200 rounded-xl border font-medium" onClick={handleLinkedInSignIn}><Image src={"/images/linkedin.png"} width="25" height="25" alt="Facebook logo" /> Sign In with LinkedIn</button>
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

export default LoginForm;
