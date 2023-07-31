import Wallet from "@/pages/wallet";
import { render } from "@testing-library/react";
import { TransactionContext } from "@/components/organisms/Transaction";
import { SessionProvider } from "next-auth/react";

describe("Wallet", () => {
  it("should render the heading", () => {
    const { container } = render(
      <SessionProvider session={{ user: { data: { access_token: {} } } }}>
        <TransactionContext.Provider
          value={{ transaction: {}, setTransaction: () => {} }}
        >
          <Wallet />
        </TransactionContext.Provider>
      </SessionProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
