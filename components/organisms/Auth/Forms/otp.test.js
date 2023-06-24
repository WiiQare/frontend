import { render } from "@testing-library/react";
import OTP from "./otp";
import { FormContextRegister } from "../RegisterForm";
import { Provider } from "react-redux";
import { store } from "../../../../redux/store";
import { QueryClientProvider, QueryClient } from "react-query";

describe("OTP", () => {
  it("renders", () => {
    const queryClient = new QueryClient();
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <FormContextRegister.Provider
            value={{
              activeStep: 0,
              setActiveStep: jest.fn(),
              handleComplete: jest.fn(),
              formData: {},
              setFormData: jest.fn(),
            }}
          >
            <OTP />
          </FormContextRegister.Provider>
        </Provider>
      </QueryClientProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
