import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Identity2 from "./identity2";
import { FormContext } from "../../../../pages/voucher/buy";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "../../../../redux/store";
import { QueryClientProvider, QueryClient } from "react-query";
import userEvent from "@testing-library/user-event";

describe("Identity2", () => {
  let component;
  beforeEach(() => {
    const queryClient = new QueryClient();
    const res = render(
      <SessionProvider session={{ user: { data: { userId: "random123" } } }}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <FormContext.Provider value={{ activeStepIndex: 0 }}>
              <Identity2 />
            </FormContext.Provider>
          </Provider>
        </QueryClientProvider>
      </SessionProvider>
    );
    component = res.container;
  });

  it("should render the component", () => {
    expect(component).toMatchSnapshot();
  });

  it("should render a text to add a beneficiary", () => {
    expect(screen.getByText("Ajouter un bénéficiaire")).toBeInTheDocument();
  });

  it("should fill the form", async () => {
    const user = userEvent.setup();

    const addBeneficiary = screen.getByText("Ajouter un bénéficiaire");

    await user.click(addBeneficiary);

    const phone = screen.getByLabelText("Numéro de Téléphone");
    const firstName = screen.getByLabelText("Nom de famille");
    const lastName = screen.getByLabelText("Prénom");
    const email = screen.getByLabelText("Adresse e-mail (optional)");
    const address = screen.getByLabelText("Adresse du domicile");
    // const postalCode = screen.getByLabelText("Code postal");
    const city = screen.getByLabelText("Ville");
    // const country = screen.getByLabelText("Pays");
    // const submit = screen.getByText("Continuer avec ce patient");
  });
});
