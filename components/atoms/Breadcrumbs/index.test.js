import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Breadcrumb from ".";

describe("Breadcrumb", () => {
  it("should render the component", () => {
    render(<Breadcrumb items={[]} />);
    expect(screen.getByRole("list")).toBeInTheDocument();
  });
});
