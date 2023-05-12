import "@testing-library/jest-dom";
import Page from "@/pages/invoices";
import { render, screen } from "@testing-library/react";

describe("invoices page", () => {
  it("should render the page", () => {
    render(<Page />);
    expect(screen.getByText("Invoices")).toBeInTheDocument();
  });
});
