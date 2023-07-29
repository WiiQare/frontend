import Page from "@/pages/reset-password/[token]";
import { render } from "@testing-library/react";
import { QueryClientProvider, QueryClient } from "react-query";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    query: {
      "payment-intent": "pi_1J4JrjGswQjYFZwX0Z1Z1Z1Z",
    },
  }),
}));

describe("Transactions id page", () => {
  it("should render the page", () => {
    const queryClient = new QueryClient();
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <Page />
      </QueryClientProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
