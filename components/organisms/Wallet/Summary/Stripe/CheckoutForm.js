import React from 'react';
import {
  PaymentElement,
  LinkAuthenticationElement,
  AddressElement,
  AddressElementComponent,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { HiArrowSmRight } from 'react-icons/hi';

export default function CheckoutForm({}) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret',
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.clear();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        //return_url: "http://localhost:3000/voucher/buy?step=end",
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/saving/done`,
      },
    });

    //Clear all item on localstorage
    if (!error) localStorage.clear();

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: 'tabs',
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className="flex flex-col gap-6"
    >
      <LinkAuthenticationElement
        id="link-authentication-element"
        options={{
          defaultValues: { email: '' },
        }}
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />

      <div className="w-full flex flex-row-reverse">
        <button
          disabled={isLoading || !stripe || !elements}
          type="submit"
          className="mb-8 w-full rounded-md bg-orange effect-up px-6 py-4 font-medium text-white"
        >
          {!isLoading ? 'Procéder au paiement' : 'Chargement...'}
        </button>
      </div>

      {/* Show any error or success messages */}
      {message && (
        <div id="payment-message" className="text-sm text-red-500">
          {message}
        </div>
      )}
    </form>
  );
}
