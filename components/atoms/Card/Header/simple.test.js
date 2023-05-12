import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Simple from "./simple";

describe("Simple Card Header", () => {
  it("should render the component", () => {
    render(<Simple />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("should render the title", () => {
    const title = "Title";
    render(<Simple title={title} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("should render the describe", () => {
    const describe = "Describe";
    render(<Simple describe={describe} />);
    expect(screen.getByText(describe)).toBeInTheDocument();
  });

  it("should render the children", () => {
    const children = <div>Children</div>;
    render(<Simple>{children}</Simple>);
    expect(screen.getByText("Children")).toBeInTheDocument();
  });
});
