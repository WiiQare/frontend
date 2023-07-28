import "@testing-library/jest-dom";
import Page from "@/pages/checkout";
import { render, screen } from "@testing-library/react";
require("jest-fetch-mock").enableMocks();

describe("checkout page", () => {
  it("should render empty page when fetch fails", () => {
    fetch.mockResponse("{}");
    const { container } = render(<Page />);
    expect(container).toMatchSnapshot();
    expect(container.querySelector("div")).toBeEmptyDOMElement();
  });
});
