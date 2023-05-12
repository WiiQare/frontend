import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import LogoHeader from ".";

describe("LogoHeader", () => {
  it("renders the logo", () => {
    render(<LogoHeader />);
    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  it("renders the logo with the correct link", () => {
    render(<LogoHeader />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/");
  });
});
