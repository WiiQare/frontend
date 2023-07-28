import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Email from "./email";
import { FormContextRegister } from "../RegisterForm";
import { Provider } from "react-redux";
import { store } from "../../../../redux/store";
import { QueryClientProvider, QueryClient } from "react-query";
import * as Helpers from "../../../../lib/helper";

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
    jest.spyOn(Helpers, "sendEmail").mockResolvedValueOnce({});
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
    expect(Helpers.sendEmail).toHaveBeenCalledTimes(1);
    expect(Helpers.sendEmail).toHaveBeenCalledWith({ email });
  });

  it("should handle error if email is not sent", async () => {
    jest.spyOn(Helpers, "sendEmail").mockResolvedValueOnce({
      code: 400,
      message: "Email failed to send",
    });
    const user = userEvent.setup();
    const email = "test@example.com";
    const emailInput = screen.getByLabelText("E-mail Address");
    const submitButton = screen.getByRole("button", {
      name: "L'ÉTAPE SUIVANTE",
    });

    await user.type(emailInput, email);
    await user.click(submitButton);
    expect(Helpers.sendEmail).toHaveBeenCalledTimes(1);
    expect(Helpers.sendEmail).toHaveBeenCalledWith({ email });
  });
});
