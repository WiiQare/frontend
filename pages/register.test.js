import "@testing-library/jest-dom";
import Register from "./register";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { QueryClientProvider, QueryClient } from "react-query";
import { SessionProvider } from "next-auth/react";
require("jest-fetch-mock").enableMocks();

describe("register page", () => {
  it("should render empty page when fetch fails", () => {
    fetch.mockResponse("{}");
    const queryClient = new QueryClient();
    const { container } = render(
      <SessionProvider session={{ user: { data: { userId: "random123" } } }}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <Register />
          </Provider>
        </QueryClientProvider>
      </SessionProvider>
    );
    expect(container).toMatchSnapshot();
    expect(screen.getByText("L'ÉTAPE SUIVANTE")).toBeInTheDocument();
  });
});
