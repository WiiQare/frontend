import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Toast from ".";

describe("Toast", () => {
  it("should render the component", () => {
    render(<Toast />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
