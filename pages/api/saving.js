// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (amount) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return parseFloat(amount) * 100;
};

export default async function handler(req, res) {
  try {
    const { type, month } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(100),
      currency: "USD",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        type, month
      }
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log("api/saving", error);
  }
 
};