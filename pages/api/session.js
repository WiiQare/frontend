// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (amount) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return parseFloat(amount)*100;
};

export default async function handler(req, res) {
  const { amount, senderId } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(amount),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      senderId: senderId,
    }
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};