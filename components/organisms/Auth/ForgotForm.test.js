import React from "react";
import { render } from "@testing-library/react";
import ForgotForm from "./ForgotForm";
import { QueryClientProvider, QueryClient } from "react-query";

describe("ForgotForm", () => {
  it("renders", () => {
    const { container } = render(
      <QueryClientProvider client={new QueryClient()}>
        <ForgotForm />
      </QueryClientProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
