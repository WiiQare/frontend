import React, { useContext, useState } from "react";
import { ErrorMessage, Field, FormikProvider, useFormik } from "formik";
import { FormContext } from "../../../../pages/voucher/buy";
import * as yup from "yup";
import { HiArrowSmRight, HiOutlineInformationCircle } from "react-icons/hi";
import { useSession } from "next-auth/react";

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input';
import Fetcher from "../../../../lib/Fetcher";
import { autocomplete, savePatient } from "../../../../lib/helper";
import { useMutation } from 'react-query';
import LoadingButton from "../../Loader/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { setPatientDispatch } from "../../../../redux/reducer";
import Toast from "../../Toast";

function Identity() {
	const { activeStepIndex, setActiveStepIndex, formData, setFormData } = useContext(FormContext);
	const [phone, setPhone] = useState();
	const [patient, setPatient] = useState({});
	const [patientExist, setPatientExist] = useState(false);
	const [requestComplete, setRequestComplete] = useState(false);
    const {data:session} = useSession();
    const dispatch = useDispatch();
    const [state, setState] = useState({ type: 0, message: '' });
    const client = useSelector((state) => state.app.client);



	const renderError = (message) => (
		<p className="text-xs text-red-600 font-light flex items-center gap-1"><HiOutlineInformationCircle />{message}</p>
	);

	const ValidationSchema = yup.object().shape({
		firstName: yup.string().required("Fistname is a required field"),
		lastName: yup.string().required("Lastname is a required field"),
		email: yup.string().email().required("Address email is a required field"),
		homeAddress: yup.string().required(),
		city: yup.string().required(),
		phoneNumber: yup.string(),
	});

	const savePatientMutation = useMutation(savePatient, {
        onSuccess: (res) => {

			if (res.code) {
                setState({ type: 2, message: res.message ?? res.description })
                setTimeout(() => {
                    setState({ type: 0, message: "" })
                }, 3000);

            } else {
                setState({ type: 1, message: "Successfully registered" })
				dispatch(setPatientDispatch({...res}))

				setActiveStepIndex(activeStepIndex + 1);

            };
        }
    });

	const onSubmit= (values) => {
		console.log("ok")
		if (Object.keys(values).length == 0) return console.log("Pas de données");
		
		values.phoneNumber = phone;
		values.country = "CD";
		const data = { ...formData, ...values };

		if (patientExist) {
			// let {phoneNumber, firstName, lastName, email, ...data} = data
			dispatch(setPatientDispatch({...client.patient, ...data}))
			setActiveStepIndex(activeStepIndex + 1);

		} else {
			savePatientMutation.mutate({ ...data, accessToken: session.accessToken })
		}
	}

	const closeToast = () => {
		setState({ type: 0, message: "" })
	}

	const formik = useFormik({
        initialValues: {
            firstName: "",
			lastName: "",
			email: "",
			homeAddress: "",
			city: "",
			phoneNumber: "",
			country: "",
        },
        validationSchema: ValidationSchema,
        onSubmit
    })

	const handlePhone = async (value) => {
		setPhone(value);
		setRequestComplete(true);

		const res = await autocomplete(value, session.accessToken)
		
		setRequestComplete(false);

        if (!res.code) {
			setPatient(res)
			setPatientExist(true)

			//Set Value
			formik.setFieldValue("phoneNumber", res.phoneNumber)
			formik.setFieldValue("firstName", res.firstName)
			formik.setFieldValue("lastName", res.lastName)
			formik.setFieldValue("email", res.email)

			dispatch(setPatientDispatch({...res}))
		} else {
			setPatientExist(false)
		}

	}

	return (
		<>
            {state.type > 0 ? state.type == 2 ? <Toast type={"danger"} message={state.message} close={closeToast} /> : (state.type == 1 ? <Toast type={"success"} message={state.message} close={closeToast} /> : <></>) : <></>}

			<FormikProvider value={formik}>

				<form className="flex flex-col justify-start md:w-2/3 gap-4" onSubmit={formik.handleSubmit}>

					<div className="space-y-1">
						<div className="flex flex-col items-start space-y-1 relative">
							<label className="text-gray-500 font-light text-sm">Phone Number</label>
							<PhoneInput
								defaultCountry="CD"
								placeholder="Enter phone number"
								value={phone}
								onChange={handlePhone}
								name="phoneNumber"
								className="rounded-lg border px-4 py-1.5 w-full placeholder:text-gray-400 text-gray-700 text-md"	
							/>
							{requestComplete && (
								<div className="absolute right-4 top-1/2">
									<div class="animate-spin inline-block w-4 h-4 border-[1px] border-current border-t-transparent text-blue-400 rounded-full" role="status" aria-label="loading">
										<span class="sr-only">Loading...</span>
									</div>
								</div>
							)}
							
						</div>
						{formik.errors.phoneNumber ?  renderError(formik.errors.phoneNumber): <></>}

					</div>

					<div className="grid md:grid-cols-2 gap-4">
						<div className="space-y-1">
							<div className="flex flex-col items-start gap-1">
								<label className="text-gray-500 font-light text-sm">Firstname</label>
								<Field
									name="firstName"
									value={patient.firstName}
									onChange={(e) => setPatient({...patient, firstName: e.target.value})}
									className="rounded-lg border px-4 py-3 w-full placeholder:text-gray-400 text-gray-700 text-md"
									placeholder="John"
									disabled={patientExist && patient.firstName}
									{...formik.getFieldProps('firstName')}
								/>
							</div>
							{formik.errors.firstName ?  renderError(formik.errors.firstName): <></>}
						</div>

						<div className="space-y-1">
							<div className="flex flex-col items-start gap-1">
								<label className="text-gray-500 font-light text-sm">Lastname</label>
								<Field
									name="lastName"
									value={patient.lastName}
									onChange={(e) => setPatient({...patient, lastName: e.target.value})}
									className="rounded-lg border px-4 py-3 w-full placeholder:text-gray-400 text-gray-700 text-md"
									placeholder="Doe"
									disabled={patientExist && patient.lastName}
									{...formik.getFieldProps('lastName')}
								/>
							</div>
							{formik.errors.lastName ?  renderError(formik.errors.lastName): <></>}
						</div>

					</div>

					<div className="space-y-1">
						<div className="flex flex-col items-start space-y-1">
							<label className="text-gray-500 font-light text-sm">Email</label>
							<Field
								name="email"
								value={patient.email}
								onChange={(e) => setPatient({...patient, email: e.target.value})}
								className="rounded-lg border px-4 py-3 w-full placeholder:text-gray-400 text-gray-700 text-md"
								placeholder="john.doe@wiiqare.com"
								disabled={patientExist && patient.email}
								{...formik.getFieldProps('email')}
							/>
						</div>
						{formik.errors.email ?  renderError(formik.errors.email): <></>}
					</div>


					<div className="grid md:grid-cols-2 gap-4">
						<div className="space-y-1">
							<div className="flex flex-col items-start gap-1">
								<label className="text-gray-500 font-light text-sm">Home Address</label>
								<Field
									name="homeAddress"
									className="rounded-lg border px-4 py-3 w-full placeholder:text-gray-400 text-gray-700 text-md"
									placeholder="23, Mimosas C/Ngaliema"
									{...formik.getFieldProps('homeAddress')}
								/>
							</div>
							{formik.errors.homeAddress ?  renderError(formik.errors.homeAddress): <></>}
						</div>

						<div className="space-y-1">
							<div className="flex flex-col items-start gap-1">
								<label className="text-gray-500 font-light text-sm">City</label>
								<Field
									name="city"
									className="rounded-lg border px-4 py-3 w-full placeholder:text-gray-400 text-gray-700 text-md"
									placeholder="Eg. Kinshasa"
									{...formik.getFieldProps('city')}
								/>
							</div>
						{formik.errors.city ?  renderError(formik.errors.city): <></>}
						</div>

					</div>

					<div className="flex flex-row-reverse ">

						<button
							className="bg-primary flex gap-3 items-center w-fit font-medium text-white my-2 py-3 px-5 hover:bg-blue-500 duration-200 transition-all hover:shadow rounded-lg"
							type="submit"
						>
							{savePatientMutation.isLoading ? <LoadingButton /> : <>{patientExist ? 'Continuer avec ce patient' : 'Next'} <HiArrowSmRight /></>}
							
						</button>

					</div>
				</form>
			</FormikProvider>
		</>
	);
}

export default Identity;
