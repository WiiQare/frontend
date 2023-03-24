import React, { useContext } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FormContext } from "../../../../pages/voucher/buy";
import * as yup from "yup";
import { HiOutlineInformationCircle } from "react-icons/hi";

function Send() {
	const { activeStepIndex, setActiveStepIndex, formData, setFormData } = useContext(FormContext);

	const renderError = (message) => (
		<p className="text-xs text-red-600 font-light flex items-center gap-1"><HiOutlineInformationCircle />{message}</p>
	);

	const ValidationSchema = yup.object().shape({
		
	});

	return (
		<Formik
			initialValues={{
				
			}}
			validationSchema={ValidationSchema}
			onSubmit={(values) => {
				const data = { ...formData, ...values };
				setFormData(data);
				setActiveStepIndex(activeStepIndex + 1);
			}}
		>
			<Form className="flex flex-col justify-start md:w-2/3 gap-4">
				<div className="text-2xl font-medium my-4 capitalize">Send Voucher !</div>
				
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, vero nulla doloribus harum, ipsa reprehenderit delectus minus excepturi inventore, iste in suscipit? Neque facere laudantium dicta optio ullam omnis totam.
                </p>

				<div className="flex flex-row-reverse ">
                    <button
                        className="bg-primary flex gap-3 items-center w-fit font-medium text-white my-2 py-3 px-5 hover:bg-blue-500 duration-200 transition-all hover:shadow rounded-lg"
                        type="submit"
                    >
                        Send Voucher
                    </button>
				</div>
			</Form>
		</Formik>
	);
}

export default Send;
