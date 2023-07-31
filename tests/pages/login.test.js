import "@testing-library/jest-dom";
import Login from "@/pages/login";
import { render } from "@testing-library/react";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    router: [],
  }),
}));

describe("Login page", () => {
  it("should render the login page", () => {
    const { container } = render(<Login />);
    expect(container).toMatchSnapshot();
  });
});
