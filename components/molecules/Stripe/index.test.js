import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import StripePayment from '.';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';
require('jest-fetch-mock').enableMocks();


describe('ItemStripe', () => {
    it('should render the component stripe', () => {

        fetch.mockResponse("{}");

        const amount = 20, senderId = 'sender', patientId = 'patient';

        render(<Provider store={store}>
            <StripePayment
                amount={amount}
                senderId={senderId}
                patientId={patientId}
            />
        </Provider>)

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
})