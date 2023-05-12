import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Badge from "./Badge";

describe("Badge", () => {
  it("should render the children", () => {
    const children = "Children";
    render(<Badge>{children}</Badge>);
    expect(screen.getByText(children)).toBeInTheDocument();
  });
});
