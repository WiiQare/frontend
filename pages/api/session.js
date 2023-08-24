// This is your test secret API key.
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (amount) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return parseFloat(amount) * 100;
};

export default async function handler(req, res) {
  try {
    const { amount, senderId, patientId, patient } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(amount),
      currency: patient.currency.sender.toLowerCase(),
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        patientId: patientId, // who is receiving the payment
        homeAddress: patient.homeAddress,
        phoneNumber: patient.phoneNumber,
        firstName: patient.firstName,
        lastName: patient.lastName,
        currencyPatient: patient.currency.patient,
        currencyRate: patient.currency.rate,
        currencyPatientAmount: patient.currency.patientAmount,
        country: patient.country,
        email: patient.email,
        city: patient.city,
        senderId: senderId, // who is paying
        currencySender: patient.currency.sender,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log('api/session', error);
  }
}
