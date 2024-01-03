import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { useQRCode } from "next-qrcode";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Fetcher from '../../../lib/Fetcher';
import Pass from "./[pass]";

jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

jest.mock("next-qrcode", () => ({
    useQRCode: jest.fn(),
}));

jest.mock("react-copy-to-clipboard", () => ({
    CopyToClipboard: jest.fn(),
}));

jest.mock('../../../lib/Fetcher', () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

describe("Pass", () => {
    beforeEach(() => {
        useRouter.mockReturnValue({
            query: {
                pass: "pass123",
            },
        });

        useQRCode.mockReturnValue({
            Canvas: jest.fn(),
        });

        CopyToClipboard.mockReturnValue(jest.fn());

        Fetcher.mockReturnValue({
            data: {
                voucherEntity: {
                    voucherHash: "voucher123",
                },
                currency: "USD",
                amount: 100,
                sender: {
                    firstName: "John",
                },
                patient: {
                    firstName: "Jane",
                },
            },
            isLoading: false,
            isError: false,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render the loading state", () => {
        Fetcher.mockReturnValue({
            isLoading: true,
        });

        render(<Pass />);

        expect(screen.getByRole("status")).toBeInTheDocument();
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("should render the error state", () => {
        Fetcher.mockReturnValue({
            isError: true,
        });

        render(<Pass />);

        expect(screen.getByText("Error Voucher !")).toBeInTheDocument();
    });

    it("should render the Pass component with data", () => {
        render(<Pass />);

        expect(screen.getByText("Pass Santé")).toBeInTheDocument();
        expect(screen.getByText("Pass Santé ID:")).toBeInTheDocument();
        expect(screen.getByText("Pass santé WiiQare")).toBeInTheDocument();
        expect(screen.getByText("Suivez-nous sur les réseaux sociaux")).toBeInTheDocument();
    });
});