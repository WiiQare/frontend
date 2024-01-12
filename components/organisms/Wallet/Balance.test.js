import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import WalletBalance from "./Balance";
import { SessionProvider } from "next-auth/react";

describe("WalletBalance", () => {
    test("renders loading message when data is loading", () => {
        render(
            <SessionProvider session={{ data: { userId: "12345678" } }}>
                <WalletBalance data={{ isLoading: true }} />
            </SessionProvider>);
        const loadingMessage = screen.getByText("Loading...");
        expect(loadingMessage).toBeInTheDocument();
    });

    test("renders wallet balance details when data is loaded", () => {
        const sessionData = {
            user: {
                data: {
                    userId: "1234567890abcdef",
                },
            },
        };
        const data = {
            isLoading: false,
            data: [
                {
                    type: "MOI",
                    amount: 100,
                    currency: "USD",
                    operations: [],
                },
                {
                    type: "Other",
                    amount: 200,
                    currency: "EUR",
                    operations: [],
                },
            ],
        };

        render(
            <SessionProvider session={sessionData}>
                <WalletBalance data={data} />
            </SessionProvider>
        );

        // Check if wallet balance details are rendered correctly
        const walletId = screen.getByText("#12345678...0abcdef");
        expect(walletId).toBeInTheDocument();

        const walletType = screen.getByText("POUR MOI");
        expect(walletType).toBeInTheDocument();

        const walletAmount = screen.getByText("$100.00");
        expect(walletAmount).toBeInTheDocument();

    });

    // test("renders 'No savings currently in progress' message when data is loaded but no savings are available", () => {
    //     const data = {
    //         isLoading: false,
    //         data: [],
    //     };

    //     render(<WalletBalance data={data} />);

    //     const noSavingsMessage = screen.getByText("Aucun épargne actuellement en cours...");
    //     expect(noSavingsMessage).toBeInTheDocument();
    // });
});