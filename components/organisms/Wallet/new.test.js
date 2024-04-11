import { render, screen } from '@testing-library/react';
import NewSaving from './NewSaving'; // Adjust the import path as necessary
import '@testing-library/jest-dom';

describe('NewSaving Component Tests', () => {
    it('should render without crashing', () => {
        render(<NewSaving />);
        expect(screen.getByText(/Nouvelle épargne/i)).toBeInTheDocument();
    });

    it('renders the correct number of SavingCard components', () => {
        render(<NewSaving />);
        const savingCards = screen.getAllByRole('img'); // Assuming SavingCard uses <img> for the image
        expect(savingCards).toHaveLength(6); // Should match the number of items in the savings array
    });

    it('renders the CardHeader with the correct title', () => {
        render(<NewSaving />);
        expect(screen.getByText(/Nouvelle épargne/i)).toBeInTheDocument();
    });

    it('displays the correct static descriptive texts', () => {
        render(<NewSaving />);
        expect(screen.getByText(/Vous éparnez pour qui, mieux pour quoi ?/i)).toBeInTheDocument();
        expect(screen.getByText(/Sélectionner un type d'épargne par ceux présenter ici/i)).toBeInTheDocument();
        expect(screen.getByText(/Epargner c'est vivre le futur/i)).toBeInTheDocument();
    });

    // This test assumes SavingCard component displays the title as text
    it('passes correct props to SavingCard components', () => {
        render(<NewSaving />);
        expect(screen.getByText(/Pour moi/i)).toBeInTheDocument();
        expect(screen.getByText(/Famille/i)).toBeInTheDocument();
        // Continue for other savings titles...
    });
});
