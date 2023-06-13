import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Buy from "./Buy";

describe("Buy button", () => {
  it("should render the component", () => {
    const { container } = render(<Buy title="Sample Text" />);
    expect(container).toMatchSnapshot();
  });

  it("should render the component", () => {
    render(<Buy />);
    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  it("should render the text", () => {
    const text = "Button";
    render(<Buy title={text} />);
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it("should render the iconw without icon", () => {
    render(<Buy withIcon={false} />);
    expect(screen.getByRole("link")).toBeInTheDocument();
  });
});
