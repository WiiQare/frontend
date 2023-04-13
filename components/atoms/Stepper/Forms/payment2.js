import React, { useContext, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FormContext } from "../../../../pages/voucher/buy";
import { HiOutlineInformationCircle } from "react-icons/hi";
import * as yup from "yup";
import StripePayment from "../../../molecules/Stripe";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { FcCurrencyExchange } from "react-icons/fc";
import { CgArrowsExchangeAltV } from "react-icons/cg";

function Payment2(props) {
	const { activeStepIndex, setActiveStepIndex, formData, setFormData } = useContext(FormContext);
	const [amount, setAmount] = useState(0);
	const client = useSelector((state) => state.app.client);
	const { data } = useSession();

	return (
		<>
			{/* <div className="text-2xl font-medium my-4 capitalize">Choice your payment method !</div> */}
			{amount == 0 ? <Amount amount={amount} setAmount={setAmount} /> : <StripePayment amount={amount} senderId={data.user.data.userId} patientId={client.patient.id} />}
		</>
	);
}

export default Payment2;

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
			<Form className="flex justify-center w-full  py-4 items-end">
				<div className="grid lg:grid-cols-2 lg:px-10 gap-6">
					<div className="px-4 pt-8">
						<p className="text-xl font-medium">Details Patient</p>
						<p className="text-gray-400 text-xs">Confirmer les informations et choisissez la methode de paiement</p>


						<div className="items-center sm:flex w-full">
							<div className="py-5 w-full">
								<h3 className="text-xl font-bold tracking-tight text-gray-900 ">
									<a href="#">Peter NDENGO</a>
								</h3>
								<span className="text-gray-500 ">frdrcpeter@gmail.com</span>
								<p className="mt-3 mb-4 font-light text-gray-500 w-full">
									<ul className="flex flex-col gap-1 w-full text-sm">
										<li className="flex justify-between w-full">Phone Number: <b className="text-orange">+243 814 978 651</b></li>
										<li className="flex justify-between w-full">Country: <b className="text-gray-700 flex gap-1 items-center"><img src="https://flagcdn.com/w20/cd.png" alt="cd" className="rounded-full h-4 w-4 object-cover" /> Congo RDC</b></li>
										<li className="flex justify-between w-full">City: <b className="text-gray-700">Kinshasa</b></li>
										<li className="flex justify-between w-full">Home Address: <b className="text-gray-700">33, Bocage C/ Ngaliema Q. Macampagne</b></li>
									</ul>
								</p>

							</div>
						</div>

						<p className="mt-8 text-lg font-medium">Methods Payment</p>
						<form className="mt-5 grid gap-6">
							<div className="relative">
								<input className="peer hidden" id="radio_1" type="radio" name="radio" checked />
								<span className="peer-checked:border-orange absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
								<label className="peer-checked:border-2 peer-checked:border-orange peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_1">
									<img className="w-14 object-contain" src="/images/carte-bancaire.png" alt="" />
									<div className="ml-5">
										<span className="mt-2 font-semibold">Carte Bancaire</span>
										<p className="text-slate-500 text-sm leading-6">Visa, Mastercard & Stripe</p>
									</div>
								</label>
							</div>
							<div className="relative">
								<input className="peer hidden" id="radio_2" type="radio" name="radio" checked />
								<span className="peer-checked:border-orange absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
								<label className="peer-checked:border-2 peer-checked:border-orange peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_2">
									<img className="w-14 object-contain" src="/images/crypto-monnaie.png" alt="" />
									<div className="ml-5">
										<span className="mt-2 font-semibold">Crypto Monaie</span>
										<p className="text-slate-500 text-sm leading-6">Ethereum (ETH) & Bitcoin (BTC)</p>
									</div>
								</label>
							</div>
						</form>
					</div>
					<div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
						<p className="text-xl font-medium">Payment Details</p>
						<p className="text-gray-400 text-xs mb-4">Complete your order by providing your payment details.</p>
						<div className="">

							<div className="space-y-6">
								<div>
									<label for="hs-inline-leading-pricing-select-label" className="block text-sm font-medium mb-2 ">Devise de départ</label>
									<div className="relative">
										<input type="text" id="hs-inline-leading-pricing-select-label" name="inline-add-on" className="py-3 px-4 pl-9 pr-20 block w-full border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 " placeholder="0.00" />
											<div className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 pl-4">
												<span className="text-gray-500">$</span>
											</div>
											<div className="absolute inset-y-0 right-0 flex items-center text-gray-500 pr-px">
												<label for="hs-inline-leading-select-currency" className="sr-only">Currency</label>
												<select id="hs-inline-leading-select-currency" name="hs-inline-leading-select-currency" className="block w-full border-transparent rounded-md focus:ring-blue-600 focus:border-blue-600 ">
													<option>USD</option>
													<option>CAD</option>
													<option>EUR</option>
												</select>
											</div>
									</div>
								</div>
								
								<div className="flex gap-1 items-center justify-center">
									<CgArrowsExchangeAltV size={40} className="text-gray-400"/>
								</div>

								<div>
									<label for="hs-inline-leading-pricing-select-label" className="block text-sm font-medium mb-2 ">À quel devise voulez-vous l'envoyer </label>
									<div className="relative">
										<input type="text" id="hs-inline-leading-pricing-select-label" name="inline-add-on" className="py-3 px-4 pl-9 pr-20 block w-full border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 " placeholder="0.00" readOnly/>
											<div className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 pl-4">
												<span className="text-gray-500">$</span>
											</div>
											<div className="absolute inset-y-0 right-0 flex items-center text-gray-500 pr-px">
												<label for="hs-inline-leading-select-currency" className="sr-only">Currency</label>
												<select id="hs-inline-leading-select-currency" name="hs-inline-leading-select-currency" className="block w-full border-transparent rounded-md focus:ring-blue-600 focus:border-blue-600 ">
													<option>USD</option>
													<option>CAD</option>
													<option>EUR</option>
												</select>
											</div>
									</div>
								</div>
							</div>
							

							<div className="mt-6 border-t border-b py-2 space-y-4">
								<div className="flex items-center justify-between">
									<p className="text-sm font-medium text-gray-900">Devise d'envoie</p>
									<p className="font-normal text-sm text-gray-600">USD</p>
								</div>
								<div className="flex items-center justify-between">
									<p className="text-sm font-medium text-gray-900">Devise de réception</p>
									<p className="font-normal text-sm text-gray-600">XAF</p>
								</div>

								<div className="flex items-center justify-between">
									<p className="text-sm font-medium text-gray-900">Pays</p>
									<p className="font-normal text-sm text-gray-600 flex items-center gap-2"><img src="https://flagcdn.com/w20/cm.png" alt="cd" className="rounded-full h-4 w-4 object-cover" />Caméroun</p>
								</div>

								<div className="flex items-center justify-between">
									<p className="text-sm font-medium text-gray-900">Taux d'échange</p>
									<p className="font-normal text-sm text-gray-600">1.834 - <span className="text-orange">300 XAF</span></p>
								</div>

								<div className="flex items-center justify-between">
									<p className="text-sm font-medium text-gray-900">Frais WiiQare</p>
									<p className="font-normal text-sm text-gray-600">0%</p>
								</div>
							</div>
							<div className="mt-6 flex items-center justify-between">
								<p className="text-sm font-medium text-gray-900">Total</p>
								<p className="text-2xl font-semibold text-gray-900">$408.00</p>
							</div>
						</div>
						<button className="mt-4 mb-8 w-full rounded-md bg-orange effect-up px-6 py-3 font-medium text-white">Passer au paiement</button>
					</div>
				</div>
			</Form>

		</Formik>

	)
}
