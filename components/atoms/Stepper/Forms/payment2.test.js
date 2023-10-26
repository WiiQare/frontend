import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Payment2 from './payment2';
import { FormContext } from '../../../../pages/voucher/buy';
import { Provider } from 'react-redux';
import { store } from '../../../../redux/store';
import { SessionProvider } from 'next-auth/react';
require('jest-fetch-mock').enableMocks();


describe('Payment2 component', () => {
  it('renders the component without crashing', () => {

    fetch.mockResponse('{}');

    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(JSON.stringify({
      firstName: 'John',
      amount: 123,
    }));

    render(
      <SessionProvider session={{
        user: {
          name: 'John',
          data: {
            userId: 1,
          }
        }
      }}>
        <Provider store={store}>
          <FormContext.Provider value={{
            activeStepIndex: 0, // identity step
          }}>
            <Payment2 />
          </FormContext.Provider >
        </Provider>
      </SessionProvider>
    );
    expect(screen).toMatchSnapshot();
  });

  it('renders the component with amount 0', () => {
    fetch.mockResponse('{}');

    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(JSON.stringify({
      firstName: 'John',
      amount: 0,
      countryLabel: "United Kingdom",
      country: "UK",
    }));

    render(
      <SessionProvider session={{
        user: {
          name: 'John',
          data: {
            userId: 1,
          }
        }
      }}>
        <Provider store={store}>
          <FormContext.Provider value={{
            activeStepIndex: 0, // identity step
          }}>
            <Payment2 />
          </FormContext.Provider >
        </Provider>
      </SessionProvider>
    );
    expect(screen).toMatchSnapshot();
  });
});
