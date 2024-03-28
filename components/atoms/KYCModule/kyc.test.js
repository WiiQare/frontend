import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import KYC from './kyc';
import { authlogic, checkKyc, setKyc } from './kyc-utils';
import { FormContext } from '../../../pages/voucher/buy';
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

describe('Helper functions', () => {
  beforeEach(() => {
    console.log = jest.fn();
    fetch = jest.fn().mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValueOnce({
        hello: 'world',
      }),
    });
  });

  it('authlogic', async () => {
    fetch = jest.fn().mockResolvedValueOnce({
      status: 200,
      hello: 'world',
    });
    const response = await authlogic({ test: 'payload' });

    expect(response).toEqual({ status: 200, hello: 'world' });
  });
});

describe('Helper functions errors', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.log = jest.fn();
    fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockRejectedValueOnce(new Error('test')),
    });
  });



  it('authlogic', async () => {
    fetch = jest.fn().mockRejectedValueOnce(new Error('test'));

    const response = await authlogic({ test: 'payload' });

    expect(response).toEqual(new Error('test'));
  });

  it('setKyc', async () => {
    const response = await setKyc({ test: 'payload', accessToken: 'test' });

    expect(response).toEqual(new Error('test'));
  });

  it('checkKyc', async () => {
    const response = await checkKyc({ test: 'payload', accessToken: 'test' });

    expect(response).toEqual(new Error('test'));
  });
});