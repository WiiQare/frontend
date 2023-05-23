import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import PanelContent from "./PanelContent";
import { TransactionContext } from "../../organisms/Transaction";
import { SessionProvider } from "next-auth/react";

describe("PanelContent", () => {
  let component;
  beforeEach(() => {
    const res = render(
      <SessionProvider session={{ user: { data: { access_token: {} } } }}>
        <TransactionContext.Provider
          value={{ transaction: {}, setTransaction: () => {} }}
        >
          <PanelContent value={{}} index={{}} />
        </TransactionContext.Provider>
      </SessionProvider>
    );
    component = res.container;
  });

  it("should render the component", () => {
    expect(component).toMatchSnapshot();
  });
});
