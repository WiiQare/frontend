import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import KYC from './kyc';
import { FormContext } from '../../../../pages/voucher/buy';
import { SessionProvider } from 'next-auth/react';
require('jest-fetch-mock').enableMocks();

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    query: {
      'payment-intent': 'pi_1J4JrjGswQjYFZwX0Z1Z1Z1Z',
    },
  }),
}));

describe('KYC', () => {
  let component;
  beforeEach(() => {
    const res = render(
      <SessionProvider session={{ user: { data: { userId: 'random123' } } }}>
        <FormContext.Provider value={{ activeStepIndex: 0 }}>
          <KYC />
        </FormContext.Provider>
      </SessionProvider>
    );
    component = res.container;
  });

  it('should render the component', () => {
    expect(component).toMatchSnapshot();
  });
});