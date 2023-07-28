import Page from "@/pages/voucher/buy";
import { render } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import { QueryClientProvider, QueryClient } from "react-query";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    query: {
      "payment-intent": "pi_1J4JrjGswQjYFZwX0Z1Z1Z1Z",
    },
  }),
}));

describe("Buy", () => {
  it("should render the page", () => {
    const queryClient = new QueryClient();
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={{ user: { data: { access_token: {} } } }}>
          <Provider store={store}>
            <Page />
          </Provider>
        </SessionProvider>
      </QueryClientProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
