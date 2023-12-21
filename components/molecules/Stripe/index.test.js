import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import StripePayment from '.';

describe('ItemStripe', () => {
    it('should render the component stripe', () => {

        const amount = 20, senderId = 'sender', patientId = 'patient';

        render(<StripePayment
            amount={amount}
            senderId={senderId}
            patientId={patientId}
        />)

        expect(screen.getByText('Détails du Patient')).toBeInTheDocument();
    });
})