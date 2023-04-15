import React, { useContext, useState, useEffect } from 'react';
import Stripe from "stripe";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { countries } from "country-data";
import CurrencyFlag from 'react-currency-flags';


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


const StripePayment = ({ amount, senderId, patientId, email }) => {

	const [clientSecret, setClientSecret] = useState("");
	const client = useSelector((state) => state.app.client);


	console.log(client.patient);

	useEffect(() => {
		// Create PaymentIntent as soon as the page loads
		fetch("/api/session", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ amount, senderId, patientId, patient: client.patient }),
		})
			.then((res) => res.json())
			.then((data) => setClientSecret(data.clientSecret));
	}, []);


	const appearance = {
		theme: 'flat',
		labels: 'floating',
		rules: {
			'.Error': {
				fontSize: '10px'
			},
			'.Label': {
				fontSize: '10px'
			}
		}
	};

	const options = {
		clientSecret,
		appearance,
	};

	return (
		<>
			{
				clientSecret ? (
					<div className="flex justify-center w-full  py-4 items-end">
						<div className="grid lg:grid-cols-2 lg:px-10 gap-6">
							<div className="px-4 pt-8">
								<p className="text-xl font-medium">Details Patient</p>
								<p className="text-gray-400 text-xs">Confirmer les informations et choisissez la methode de paiement</p>


								<div className="items-center sm:flex w-full">
									<div className="py-5 w-full">
										<h3 className="text-xl font-bold tracking-tight text-gray-900 ">
											<a href="#">{client.patient.firstName} {client.patient.lastName.toUpperCase()}</a>
										</h3>
										<span className="text-gray-500 ">{client.patient?.email ?? ''}</span>
										<p className="mt-3 mb-4 font-light text-gray-500 w-full">
											<ul className="flex flex-col gap-1 w-full text-sm">
												<li className="flex justify-between w-full">Phone Number: <b className="text-orange">{client.patient.phoneNumber}</b></li>
												<li className="flex justify-between w-full">Country: <b className="text-gray-700 flex gap-1 items-center"><img src={`https://flagcdn.com/w20/${client.patient.country}.png`} alt="cd" className="rounded-full h-4 w-4 object-cover" /> {countries[client.patient.country.toUpperCase()].name}</b></li>
												<li className="flex justify-between w-full">City: <b className="text-gray-700">{client.patient.city}</b></li>
												<li className="flex justify-between w-full">Home Address: <b className="text-gray-700">{client.patient.homeAddress}</b></li>
											</ul>
										</p>

									</div>
								</div>

								<p className="mt-8 mb-4 text-lg font-medium">Methods Payment</p>
								<div className="relative">
									<input className="peer hidden" id="radio_1" type="radio" name="radio" checked />
									<label className="peer-checked:border-2 peer-checked:border-orange peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_1">
										<img className="w-14 object-contain" src="/images/carte-bancaire.png" alt="" />
										<div className="ml-5">
											<span className="mt-2 font-semibold">Carte Bancaire</span>
											<p className="text-slate-500 text-sm leading-6">Visa & Mastercard</p>
										</div>
									</label>
								</div>

								<div className="mt-6 border-t border-b py-2 space-y-4">
									<div className="flex items-center justify-between">
										<p className="text-sm font-medium text-gray-900">Devise d'envoie</p>
										<p className="font-normal text-sm text-gray-600">{client.patient.currency.sender}</p>
									</div>
									<div className="flex items-center justify-between">
										<p className="text-sm font-medium text-gray-900">Devise de réception</p>
										<p className="font-normal text-sm text-gray-600">{client.patient.currency.patient}</p>
									</div>

									<div className="flex items-center justify-between">
										<p className="text-sm font-medium text-gray-900">Monnaie</p>
										<p className="font-normal text-sm text-gray-600 flex items-center gap-2">
											<CurrencyFlag currency={client.patient.currency.patient} className="rounded-full !h-4 !w-4 object-cover" />{client.patient.currency.patientName}
										</p>
									</div>

									<div className="flex items-center justify-between">
										<p className="text-sm font-medium text-gray-900">Taux d'échange</p>
										<p className="font-normal text-sm text-gray-600">{client.patient.currency.sender == "USD" ? "$" : client.patient.currency.sender == "EUR" ? '€' : client.patient.currency.sender ?? "€"} 1.00 = <span className="text-orange">{client.patient.currency.rate.toFixed(2) ?? ''} {client.patient.currency.patient}</span></p>
									</div>

									<div className="flex items-center justify-between">
										<p className="text-sm font-medium text-gray-500">Il recevra</p>
										<p className="font-normal text-sm text-gray-600">{client?.patient?.currency?.patientAmount.toFixed(2) ?? 0} {client.patient.currency.patient == "USD" ? "$" : client.patient.currency.patient == "EUR" ? '€' : client.patient.currency.patient ?? "€"}</p>
									</div>

									<div className="flex items-center justify-between">
										<p className="text-sm font-medium text-gray-900">Frais WiiQare</p>
										<p className="font-normal text-sm text-gray-600">0%</p>
									</div>
								</div>
								<div className="mt-6 flex items-center justify-between">
									<p className="text-sm font-medium text-gray-900">Montant à payer</p>
									<p className="text-2xl font-semibold text-gray-900">{client.patient.currency.sender == "USD" ? "$" : client.patient.currency.sender == "EUR" ? '€' : client.patient.currency.sender ?? "€"} {amount}</p>
								</div>
							</div>

							<div className="mt-6 bg-gray-50 px-4 pt-8 lg:mt-0">
								<p className="text-xl font-medium">Informations Bancaire</p>
								<p className="text-gray-400 text-xs mb-4">Completez vos informations bancaire</p>

								<div>
									<Elements options={options} stripe={stripePromise}>
										<CheckoutForm amount={amount} senderId={senderId} email={email ?? ""}/>
			 						</Elements>
								</div>

							</div>

						</div>
					</div>
				) : <LoaderStripe />
			}
		</>
	);
}

export default StripePayment;

function LoaderStripe() {
	return (
		<div role="status">
			<svg aria-hidden="true" className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
				<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
			</svg>
			<span className="sr-only">Loading...</span>
		</div>
	)
}
