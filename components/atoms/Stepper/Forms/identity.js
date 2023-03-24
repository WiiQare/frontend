import React, { useContext, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FormContext } from "../../../../pages/voucher/buy";
import * as yup from "yup";
import { HiArrowSmRight, HiOutlineInformationCircle } from "react-icons/hi";
import { CountryDropdown } from 'react-country-region-selector';

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

function Identity() {
	const { activeStepIndex, setActiveStepIndex, formData, setFormData } = useContext(FormContext);
	const [phone, setPhone] = useState()

	const renderError = (message) => (
		<p className="text-xs text-red-600 font-light flex items-center gap-1"><HiOutlineInformationCircle />{message}</p>
	);

	const ValidationSchema = yup.object().shape({
		name: yup.string().required("Fistname is a required field"),
		lastname: yup.string().required("Lastname is a required field"),
		email: yup.string().email().required("Address email is a required field"),
		address: yup.string().required(),
		address2: yup.string(),
		phone: yup.string().required("Phone"),
	});

	console.log(phone);

	return (
		<Formik
			initialValues={{
				name: "",
				lastname: "",
				email: "",
				address: "",
				address2: "",
				phone: ""

			}}
			validationSchema={ValidationSchema}
			onSubmit={(values) => {

				values.phone = phone;
				const data = { ...formData, ...values };
				setFormData(data);
				setActiveStepIndex(activeStepIndex + 1);
			}}
		>
			<Form className="flex flex-col justify-start md:w-2/3 gap-4">
				<div className="text-2xl font-medium my-4 capitalize">Enter Identity for receiver !</div>

				<div className="space-y-1">
					<div className="flex flex-col items-start space-y-1">
						<label className="text-gray-500 font-light text-sm">Phone Number</label>
						<PhoneInput
							defaultCountry="CD"
							placeholder="Enter phone number"
							value={phone}
							onChange={setPhone}
							name="phone"
							className="rounded-lg border px-4 py-1.5 w-full placeholder:text-gray-400 text-gray-700 text-md"	
						/>
					</div>
					<ErrorMessage name="phone" render={renderError} />

				</div>

				<div className="grid md:grid-cols-2 gap-4">
					<div className="space-y-1">
						<div className="flex flex-col items-start gap-1">
							<label className="text-gray-500 font-light text-sm">Firstname</label>
							<Field
								name="name"
								className="rounded-lg border px-4 py-3 w-full placeholder:text-gray-400 text-gray-700 text-md"
								placeholder="John"
							/>
						</div>
						<ErrorMessage name="name" render={renderError} />
					</div>

					<div className="space-y-1">
						<div className="flex flex-col items-start gap-1">
							<label className="text-gray-500 font-light text-sm">Lastname</label>
							<Field
								name="lastname"
								className="rounded-lg border px-4 py-3 w-full placeholder:text-gray-400 text-gray-700 text-md"
								placeholder="Doe"
							/>
						</div>
						<ErrorMessage name="lastname" render={renderError} />
					</div>

				</div>

				<div className="space-y-1">
					<div className="flex flex-col items-start space-y-1">
						<label className="text-gray-500 font-light text-sm">Email</label>
						<Field
							name="email"
							className="rounded-lg border px-4 py-3 w-full placeholder:text-gray-400 text-gray-700 text-md"
							placeholder="john.doe@wiiqare.com"
						/>
					</div>
					<ErrorMessage name="email" render={renderError} />
				</div>


				<div className="grid md:grid-cols-2 gap-4">
					<div className="space-y-1">
						<div className="flex flex-col items-start gap-1">
							<label className="text-gray-500 font-light text-sm">Address 1</label>
							<Field
								name="address"
								className="rounded-lg border px-4 py-3 w-full placeholder:text-gray-400 text-gray-700 text-md"
								placeholder="23, Mimosas C/Ngaliema"
							/>
						</div>
						<ErrorMessage name="address" render={renderError} />
					</div>

					<div className="space-y-1">
						<div className="flex flex-col items-start gap-1">
							<label className="text-gray-500 font-light text-sm">Address 2 <span className="text-gray-400">(optional)</span></label>
							<Field
								name="address2"
								className="rounded-lg border px-4 py-3 w-full placeholder:text-gray-400 text-gray-700 text-md"
								placeholder="23, Mimosas C/Ngaliema"
							/>
						</div>
						<ErrorMessage name="address2" render={renderError} />
					</div>

				</div>

				<div className="flex flex-row-reverse ">

					<button
						className="bg-primary flex gap-3 items-center w-fit font-medium text-white my-2 py-3 px-5 hover:bg-blue-500 duration-200 transition-all hover:shadow rounded-lg"
						type="submit"
					>
						Next <HiArrowSmRight />
					</button>

				</div>
			</Form>
		</Formik>
	);
}

export default Identity;
