import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useMutation } from 'react-query';

import OnboardingScreen from "../../molecules/OnboardingScreen";
import MenuHolder from "../../atoms/MenuHolder";
import BlinkSnackbar from "../../atoms/BlinkSnackbar";
import { emailValidate } from "../../../lib/validate";
import { sendEmailReset } from "../../../lib/helper";
import Toast from "../../atoms/Toast";
import { useFormik } from "formik";
import LoadingButton from "../../atoms/Loader/LoadingButton";
import Image from "next/image";

function ForgotForm() {
	const matches = useMediaQuery("(max-width: 992px)");
	const [onboardingIsEnd, setOnboardingIsEnd] = React.useState("");
	const [state, setState] = useState({ type: 0, message: '' });
	const [complete, setComplete] = useState(false);


	React.useEffect(() => {
		setOnboardingIsEnd(localStorage.getItem("onboardingIsEnd") || "");
	}, []);

	const sendEmailMutation = useMutation(sendEmailReset, {
		onSuccess: (res) => {

			if (!res.code) {
				setState({ type: 1, message: "Mail envoyé avec succès" })
				setComplete(true)
			} else {
				setState({ type: 2, message: res.message ?? res.description })
				setTimeout(() => {
					setState({ type: 0, message: "" })
				}, 3000);
			};
		}
	});

	const onSubmit = async (values) => {
		if (Object.keys(values).length == 0) return console.log("Pas de données");
		sendEmailMutation.mutate(values)
	};

	const closeToast = () => {
		setState({ type: 0, message: "" })
	}

	// Formik hook
	const formik = useFormik({
		initialValues: {
			email: ''
		},
		validate: emailValidate,
		onSubmit
	})

	const formHolder = (
		<>
			<div className="form-holder">
				<MenuHolder href="/register" label="S'INSCRIRE" />
				<div className="signin-signup-form">
					<div className="flex flex-col md:w-3/4 w-full border-opacity-50 gap-4">

						<div className="form-items !w-full !max-w-full flex flex-col items-center mx-auto">

							{state.type > 0 ? state.type == 2 ? <Toast type={"danger"} message={state.message} close={closeToast} /> : (state.type == 1 ? <Toast type={"success"} message={state.message} close={closeToast} /> : <></>) : <></>}

							<div className="md:w-3/4 mx-auto">
								{
									!complete ? (
										<>
											<div className="form-title">Mot de passe oublié</div>
											<Box sx={{ mb: 3, mt: 2 }}></Box>
											<form id="signinform" className="" onSubmit={formik.handleSubmit}>
												<Stack spacing={2}>
													<div className="space-y-1">

														<TextField
															id="outlined-basic"
															fullWidth
															label="Adresse email"
															variant="outlined"
															name="email"
															{...formik.getFieldProps('email')}
														/>
														{formik.errors.email && formik.touched.email ? <span className="flex items-center gap-1 text-rose-500 text-left text-xs px-1"><HiOutlineInformationCircle /><span>{formik.errors.email}</span></span> : <></>}
													</div>

													<Box>
														<Button
															size="large"
															variant="contained"
															type="submit"
															className="bg-yellow"
														>
															{sendEmailMutation.isLoading ? <LoadingButton /> : 'Envoyer'}
														</Button>
													</Box>
												</Stack>
											</form>
										</>
									) : (
										<div className="flex flex-col gap-3 items-center">
											<Image src={"https://i.goopics.net/fuiyr8.png"} width={80} height={80} className="w-28" />
											<span className="text-xs text-gray-400 ">Un mail de réinitialisation a été envoyé à votre adresse email</span>
										</div>
									)
								}

							</div>
						</div>

					</div>
				</div>
			</div>
			{/* <BlinkSnackbar /> */}
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
