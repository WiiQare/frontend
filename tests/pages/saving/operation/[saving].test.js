import { render, screen } from "@testing-library/react";
import Page from "@/pages/saving/operation/[saving]";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
import DashboardLayout from "../../../../layouts/Dashboard";

jest.mock('next/router', () => ({
    useRouter: jest.fn().mockReturnValue({
        query: {
            'payment-intent': 'pi_1J4JrjGswQjYFZwX0Z1Z1Z1Z',
        },
    }),
}));

describe("Page", () => {
    it("should render the page title", () => {
        render(
            <QueryClientProvider client={new QueryClient()}>
                <SessionProvider session={{
                    user: {
                        name: "John Doe", data: {
                            access_token: "test",
                        }
                    }
                }}>
                    <Page />
                </SessionProvider>
            </QueryClientProvider>);
        const pageTitle = screen.getAllByText("Récharger mon épargne");
        expect(pageTitle).toHaveLength(2);
    });

    it('should use DashboardLayout as layout', () => {
        expect(Page.getLayout(<div />)).toEqual(
            <DashboardLayout className="space-y-8">
                <div />
            </DashboardLayout>,
        );
    });
});