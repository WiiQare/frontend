import "@testing-library/jest-dom";
import Invoices from "./invoices";
import { render, screen } from "@testing-library/react";

describe("Invoices page", () => {
  it("should render the invoices page", () => {
    const { container } = render(<Invoices />);
    expect(container).toMatchSnapshot();
  });
});
