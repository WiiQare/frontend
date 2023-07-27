import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Email from "./email";
import { FormContextRegister } from "../RegisterForm";
import { Provider } from "react-redux";
import { store } from "../../../../redux/store";
import { QueryClientProvider, QueryClient } from "react-query";
import { sendEmail } from "../../../../lib/helper";

jest.mock("../../../../lib/helper", () => ({
  sendEmail: jest.fn().mockResolvedValue({ code: 0 }),
}));

describe("Email", () => {
  let container;
  beforeEach(() => {
    jest.clearAllMocks();
    const queryClient = new QueryClient();
    const res = render(
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
            <Email />
          </FormContextRegister.Provider>
        </Provider>
      </QueryClientProvider>
    );
    container = res.container;
  });
  it("renders", () => {
    expect(container).toMatchSnapshot();
  });

  it("renders the form", () => {
    expect(container.querySelector("form")).toBeInTheDocument();
  });

  it("renders the email input", () => {
    expect(screen.getByLabelText("E-mail Address")).toBeInTheDocument();
  });

  it("should send email", async () => {
    const user = userEvent.setup();
    const email = "test@example.com";
    const emailInput = screen.getByLabelText("E-mail Address");
    const form = container.querySelector("form");
    const submitButton = screen.getByRole("button", {
      name: "L'ÉTAPE SUIVANTE",
    });
    expect(submitButton).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(form).toBeInTheDocument();
    expect(emailInput).toHaveValue("");
    await user.type(emailInput, email);
    expect(emailInput).toHaveValue(email);
    await user.click(submitButton);
    expect(sendEmail).toHaveBeenCalledTimes(1);
    expect(sendEmail).toHaveBeenCalledWith({ email });
  });
});
