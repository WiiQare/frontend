import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import StripePayment from '.';

import { useStripeLib } from '../PaymentForm/PaymentForm';
import PaymentStub from '../PaymentStub';

describe('ItemStripe', () => {
    if( useStripeLib ){
        it('should render the component stripe', () => {

            const amount = 20, senderId = 'sender', patientId = 'patient';
    
            render(<StripePayment
                amount={amount}
                senderId={senderId}
                patientId={patientId}
            />)
    
            expect(screen.getByText('Détails du Patient')).toBeInTheDocument();
        });
    } else {
        it('should render the stub component', async () => {
            const amount = 20, senderId = 'sender', patientId = 'patient';
    
            render(<PaymentStub
                amount={amount}
                senderId={senderId}
                patientId={patientId}
            />)
    
            expect(true);
        })
    }
    
})