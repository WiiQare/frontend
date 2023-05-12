import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CardProvider from ".";

describe("CardProvider", () => {
  test("should render CardProvider component", () => {
    render(<CardProvider />);
    expect(screen.getByText("HJ")).toBeInTheDocument();
  });
});
