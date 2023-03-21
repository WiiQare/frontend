import React from "react";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { signIn } from "next-auth/react"

import OnboardingScreen from "../../molecules/OnboardingScreen";
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

function ResetForm() {
	const matches = useMediaQuery("(max-width: 992px)");
	const [onboardingIsEnd, setOnboardingIsEnd] = React.useState("");
	const [showPassword, setShowPassword] = React.useState(false);
	const [showcPassword, setShowcPassword] = React.useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleClickShowcPassword = () => setShowcPassword((show) => !show);

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
								<div className="form-title">Create a new password</div>
								<Box sx={{ mb: 3, mt: 2 }}></Box>
								<form id="signinform" className="">
									<Stack spacing={2}>
										
										<FormControl fullWidth variant="outlined">
											<InputLabel htmlFor="outlined-basic1">Enter New Password</InputLabel>
											<OutlinedInput
												id="outlined-basic1"
												label="New Password"
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

                                        <FormControl fullWidth variant="outlined">
											<InputLabel htmlFor="outlined-basic1">Confirm New Password</InputLabel>
											<OutlinedInput
												id="outlined-basic1"
												label="Confirm Password"
												type={showcPassword ? "text" : "password"}
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

										<Box>
											<Button
												size="large"
												variant="contained"
												onClick={() => { }}
												className="bg-yellow"
											>
												CHANGE PASSWORD
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

export default ResetForm;
