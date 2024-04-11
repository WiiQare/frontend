// Import the functions you wish to test
const { createPaymentIntent, GenericPaymentExport } = require('./SavingHelper');

// Mocking the stripe module
jest.mock('stripe', () => {
    return jest.fn().mockImplementation(() => {
        return {
            paymentIntents: {
                create: async (options) => {
                    return {
                        client_secret: 'mock-client-secret',
                        ...options,
                    };
                },
            },
        };
    });
});

describe('createPaymentIntent', () => {
    it('should create a payment intent with the correct options', async () => {
        const options = { amount: 1000, currency: 'usd' };
        const paymentIntent = await createPaymentIntent(options);

        expect(paymentIntent).toHaveProperty('client_secret', 'mock-client-secret');
        // Ensure the options are passed correctly to the mocked Stripe function
        expect(paymentIntent).toMatchObject(options);
    });
});

describe('GenericPaymentExport', () => {
    it('checks if GenericPaymentExport is defined', () => {
        expect(GenericPaymentExport).toBeDefined();
    });
});
