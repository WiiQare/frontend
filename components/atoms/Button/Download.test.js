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

  it("should open the PWA prompt when clicked", () => {
    const prompt = jest.fn();
    jest.spyOn(window, "addEventListener").mockImplementation((event, cb) => {
      cb({ preventDefault: jest.fn(), prompt });
    });

    console.log = jest.fn();

    render(<Download />);
    const button = screen.getByText("Install WiiQare App");
    button.click();

    expect(prompt).toHaveBeenCalledTimes(1);
  });

  it.todo("should render nothing when PWA is not supported");
});
