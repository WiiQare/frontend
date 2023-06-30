import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Step from "./step";
import { FormContext } from "../../../pages/voucher/buy";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import { QueryClient, QueryClientProvider } from "react-query";

describe("Stepper/Step", () => {
  beforeEach(() => {
    console.log = jest.fn();
  });

  it("renders identity", () => {
    const { container } = render(
      <FormContext.Provider
        value={{
          activeStepIndex: 0,
        }}
      >
        <SessionProvider
          session={{
            user: {
              data: {
                userId: 1,
              },
            },
          }}
        >
          <Provider store={store}>
            <QueryClientProvider client={new QueryClient()}>
              <Step />
            </QueryClientProvider>
          </Provider>
        </SessionProvider>
      </FormContext.Provider>
    );
    expect(container).toMatchSnapshot("identity step");
  });
});
