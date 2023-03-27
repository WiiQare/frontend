import React, { useContext, useState, useEffect } from 'react';
import Stripe from "stripe";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


const StripePayment = ({amount}) => {
    
	const [clientSecret, setClientSecret] = useState("");

	useEffect(() => {
		// Create PaymentIntent as soon as the page loads
		fetch("/api/session", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ amount }),
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
        clientSecret && (
            <div className="flex flex-col md:grid md:grid-cols-4 justify-end w-full md:px-32">
                <div className="md:col-span-1 py-10">
                    <h1 className="font-bold text-2xl md:text-6xl flex flex-col gap-2">
                        <span className="text-gray-500 text-sm font-light md:flex hidden">Amount to be paid</span>
                        {amount}$
                    </h1>
                </div>

                <div className="md:col-span-3 flex w-full">
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm amount={amount} />
                    </Elements>
                </div>
            </div>
        )
    );
}

export default StripePayment;
