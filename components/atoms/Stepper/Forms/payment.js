import React, { useContext, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FormContext } from "../../../../pages/voucher/buy";
import { HiOutlineInformationCircle } from "react-icons/hi";
import * as yup from "yup";
import StripePayment from "../../../molecules/Stripe";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";


function Payment(props) {
	const { activeStepIndex, setActiveStepIndex, formData, setFormData } = useContext(FormContext);
	const [amount, setAmount] = useState(0);
    const client = useSelector((state) => state.app.client);
	const { data } = useSession();

	console.log(client)

	return (
		<>
			{/* <div className="text-2xl font-medium my-4 capitalize">Choice your payment method !</div> */}
			{amount == 0 ? <Amount amount={amount} setAmount={setAmount} /> : <StripePayment amount={amount} senderId={data.user.data.userId}/>}
		</>
	);
}

export default Payment;

function Amount({ amount, setAmount }) {

	const ValidationSchema = yup.object().shape({
		amount: yup.number().required("Please enter valid amount")
	});

	const renderError = (message) => (
		<p className="text-xs text-red-600 font-light flex items-center gap-1"><HiOutlineInformationCircle />{message}</p>
	);

	return (
		<Formik
			initialValues={{
				amount: ''
			}}
			validationSchema={ValidationSchema}
			onSubmit={(values) => {
				setAmount(values.amount)
			}}
		>
			<Form className="flex justify-center md:w-2/4 w-full  py-4 items-end">
				<div className="space-y-1 md:w-3/4">
					<div className="flex items-end gap-4">
						<div className="flex flex-col items-center space-y-1">
							<Field
								className="rounded-lg border px-2 md:px-4 py-3 w-full placeholder:text-gray-400 text-gray-700 text-md"
								placeholder="Enter amount"
								min="10"
								name="amount"
								defaultValue={10}

							/>
						</div>

						<button type="submit" className="bg-primary flex gap-3 items-center w-fit font-medium text-white py-3 md:px-5 px-2 text-sm md:text-md hover:bg-blue-500 duration-200 transition-all hover:shadow rounded-lg">
							Checkout
						</button>
					</div>
					<ErrorMessage name="amount" render={renderError} />
				</div>
			</Form>

		</Formik>

	)
}
