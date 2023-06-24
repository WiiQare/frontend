import { render } from "@testing-library/react";
import ProviderFilter from "./ProviderFilter";

describe("ProviderFilter", () => {
  it("renders", () => {
    const { container } = render(<ProviderFilter />);
    expect(container).toMatchSnapshot();
  });
});
