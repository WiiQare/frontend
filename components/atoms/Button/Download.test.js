import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Download from "./Download";

describe("Download button", () => {
  it("should render the component", () => {
    const { container } = render(<Download />);
    expect(container).toMatchSnapshot();
  });

  it("should render the text", () => {
    render(<Download />);
    expect(screen.getByText("Install WiiQare App")).toBeInTheDocument();
  });
});
