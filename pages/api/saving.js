import { createPaymentIntent } from '../../lib/SavingHelper';

// This is your test secret API key.
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (amount) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return parseInt(amount);
};

export default async function handler(req, res) {
  try {
    const { idSaving, amount, currency } = req.body;

    console.log('idSaving', idSaving);
    console.log('amount', amount);
    console.log('currency', currency);

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await createPaymentIntent({
      amount: 100,
      currency: currency.toLowerCase() ?? 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: {
        idSaving: idSaving,
        forSaving: true,
      },
    })

    console.log("PM", paymentIntent)

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log('api/saving', error);
  }
}
