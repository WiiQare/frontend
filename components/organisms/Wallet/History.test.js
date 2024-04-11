import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import HistoryWallet from './HistoryWallet'; // Adjust the import path as necessary

describe('HistoryWallet', () => {
    it('renders without crashing', () => {
        render(<HistoryWallet />);
        expect(screen.getByText('Historique des transactions')).toBeInTheDocument();
    });

    it('switches tabs correctly', async () => {
        render(<HistoryWallet />);
        const user = userEvent.setup();

        // Initial state: the first tab is selected
        expect(screen.getByRole('tabpanel')).toHaveTextContent('');

        // Click on the second tab
        await user.click(screen.getAllByRole('tab')[1]);
        expect(screen.getByRole('tabpanel')).toHaveAttribute('id', 'simple-tabpanel-1');

        // Click on the third tab
        await user.click(screen.getAllByRole('tab')[2]);
        expect(screen.getByRole('tabpanel')).toHaveAttribute('id', 'simple-tabpanel-2');
    });

    it('has correct accessibility props', () => {
        render(<HistoryWallet />);
        // Check for the first tab
        const firstTab = screen.getAllByRole('tab')[0];
        expect(firstTab).toHaveAttribute('id', 'simple-tab-0');
        expect(firstTab).toHaveAttribute('aria-controls', 'simple-tabpanel-0');

        // Check for the second tab
        const secondTab = screen.getAllByRole('tab')[1];
        expect(secondTab).toHaveAttribute('id', 'simple-tab-1');
        expect(secondTab).toHaveAttribute('aria-controls', 'simple-tabpanel-1');
    });
});
