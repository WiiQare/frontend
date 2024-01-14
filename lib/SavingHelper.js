/* comment code below in case not using stripe */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/* ^^^^ comment code above in case not using stripe ^^^^ */

const PaymentStub = {
    paymentIntents: {
        create: async ( options ) => {
            return {
                client_secret: 'client-secret',
            }
        },
    }
};

const paymentLib = typeof stripe !== 'undefined'? stripe : PaymentStub;

export const createPaymentIntent = async ( options ) => {
    return await paymentLib.paymentIntents.create( options );
}

export const GenericPaymentExport =  typeof stripe != 'undefined'? paymentLib : paymentLib;
