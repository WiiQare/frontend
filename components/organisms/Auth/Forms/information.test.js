import { render } from "@testing-library/react";
import Information from "./informations";
import { FormContextRegister } from "../RegisterForm";
import { Provider } from "react-redux";
import { store } from "../../../../redux/store";
import { QueryClientProvider, QueryClient } from "react-query";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    router: [],
  }),
}));

describe("Information", () => {
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
            <Information />
          </FormContextRegister.Provider>
        </Provider>
      </QueryClientProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
