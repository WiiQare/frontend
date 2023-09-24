import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

describe('CheckoutForm', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>,
    );

    expect(container).toMatchSnapshot();
  });
});
