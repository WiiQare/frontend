import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import OnboardingScreen from "../../molecules/OnboardingScreen";
import {
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
} from "@mui/material";
import MenuHolder from "../../atoms/MenuHolder";
import BlinkSnackbar from "../../atoms/BlinkSnackbar";

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
				<MenuHolder href="/register" label="S'INSCRIRE" />
				<div className="signin-signup-form">
					<div className="flex flex-col md:w-3/4 w-full border-opacity-50 gap-4">
						
						<div className="form-items !w-full !max-w-full flex flex-col items-center mx-auto">
							<div className="md:w-3/4 mx-auto">
								<div className="form-title">Créer un nouveau mot de passe</div>
								<Box sx={{ mb: 3, mt: 2 }}></Box>
								<form id="signinform" className="">
									<Stack spacing={2}>
										
										<FormControl fullWidth variant="outlined">
											<InputLabel htmlFor="outlined-basic1">Nouveau mot de passe</InputLabel>
											<OutlinedInput
												id="outlined-basic1"
												label="Nouveau mot de passe"
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
											<InputLabel htmlFor="outlined-basic1">Confirmez Mot de passe</InputLabel>
											<OutlinedInput
												id="outlined-basic1"
												label="Confirmez Mot de passe"
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
												Changer le mot de passe
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
