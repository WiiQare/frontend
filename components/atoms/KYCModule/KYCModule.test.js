import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import KYCModule from './KYCModule';

describe('KYCModule', () => {
    it('Should render the component according to the authologic variable', () => {
        // Définir la valeur de useAuthlogic à true
        const useAuthlogic = true;

        // Rendre KYCModule avec la valeur de useAuthlogic
        const { getByText } = render(<KYCModule useAuthlogic={useAuthlogic} />);

        // Vérifier si le composant KYC est rendu
        const kycElement = getByText(/KYC Verification/i);
        expect(kycElement).toBeInTheDocument();
    });
});