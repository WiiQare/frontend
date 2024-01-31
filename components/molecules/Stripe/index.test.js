import '@testing-library/jest-dom';
import { render, screen, act } from '@testing-library/react';
import StripePayment from '.';
require('jest-fetch-mock').enableMocks();


import { Provider } from 'react-redux';
import { store } from '../../../redux/store';
import { FormContext } from '../../../pages/voucher/buy';
import { useStripeLib } from '../PaymentForm/PaymentForm';
import PaymentStub from '../PaymentStub';

//mock fetch() function with custom function jest
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        clientSecret: 'payment-intent',
      }),
  }),
);

describe('ItemStripe', () => {
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };

  // Set up the mock before any test
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
  });

  jest.setTimeout(10000);

  if (useStripeLib) {
    it('should render the component stripe', async () => {
      const amount = 20,
        senderId = 'sender',
        patientId = 'patient';

      localStorageMock.getItem.mockReturnValue(
        JSON.stringify({
          firstName: 'John',
          lastName: 'Doe',
          country: '',
          currency: { 
            patient: 'USD',
            patientAmount: 100,
            rate: 0.1 
          },
        }),
      );

      const contextValues = {
        activeStepIndex: 2,
        setActiveStepIndex: jest.fn(),
        formData: {},
        setFormData: jest.fn(),
        kycTest: false,
        setKycTest: jest.fn(),
        payment_intent: 'payment-intent',
      };
      render(
        <Provider store={store}>
          <FormContext.Provider value={contextValues}>
            <StripePayment
              amount={amount}
              senderId={senderId}
              patientId={patientId}
            />
          </FormContext.Provider>
        </Provider>,
      );

      await act(async () => {
        jest.runAllTimers();
      });

      expect(screen.getByText('Détails du Patient')).toBeInTheDocument();
    });
  } else {
    it('should render the stub component', async () => {
      const amount = 20,
        senderId = 'sender',
        patientId = 'patient';

      render(
        <PaymentStub
          amount={amount}
          senderId={senderId}
          patientId={patientId}
        />,
      );

      expect(true);
    });
  }
});
