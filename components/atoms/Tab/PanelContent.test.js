import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PanelContent from "./PanelContent";
import { TransactionContext } from "../../organisms/Transaction";
import { SessionProvider } from "next-auth/react";
import fetch from "node-fetch";

describe("PanelContent", () => {
  beforeEach(() => {
    console.log = jest.fn();
  });

  it("should render the component", () => {
    const { container } = render(
      <SessionProvider session={{ user: { data: { access_token: {} } } }}>
        <TransactionContext.Provider
          value={{ transaction: {}, setTransaction: () => {} }}
        >
          <PanelContent value={0} index={1} />
        </TransactionContext.Provider>
      </SessionProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it("should render loading panel", () => {
    render(
      <SessionProvider session={{ user: { data: { access_token: {} } } }}>
        <TransactionContext.Provider
          value={{ transaction: {}, setTransaction: () => {} }}
        >
          <PanelContent value={0} index={0} />
        </TransactionContext.Provider>
      </SessionProvider>
    );

    jest.spyOn(fetch, "default").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.reject([]),
      })
    );

    expect(screen.getAllByText("Chargement en cours...")).toHaveLength(1);
  });
});
