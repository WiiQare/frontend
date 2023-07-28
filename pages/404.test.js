import "@testing-library/jest-dom";
import Error404 from "./404";
import { render } from "@testing-library/react";

describe("404 page", () => {
  it("should render the 404 page", () => {
    const { container } = render(<Error404 />);
    expect(container).toMatchSnapshot();
  });
});
