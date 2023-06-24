import React from "react";
import { render } from "@testing-library/react";
import ResetForm from "./ResetForm";
import { QueryClientProvider, QueryClient } from "react-query";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    router: [],
    query: {
      token: "token",
    },
  }),
}));

describe("ResetForm", () => {
  it("renders", () => {
    const { container } = render(
      <QueryClientProvider client={new QueryClient()}>
        <ResetForm />
      </QueryClientProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
