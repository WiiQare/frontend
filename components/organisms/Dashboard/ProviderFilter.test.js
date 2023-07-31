import { render } from "@testing-library/react";
import ProviderFilter from "./ProviderFilter";
import { SessionProvider } from "next-auth/react";

jest.mock("../../../lib/Fetcher", () => {
  return {
    __esModule: true,
    default: jest.fn().mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    }),
  };
});

describe("ProviderFilter", () => {
  it("renders", () => {
    const { container } = render(
      <SessionProvider
        session={{
          user: { name: "John Doe", data: { access_token: "12345" } },
        }}
      >
        <ProviderFilter />
      </SessionProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
