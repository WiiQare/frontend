import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import LoadingButton from "./LoadingButton";

describe("LoadingButton", () => {
  it("should render the component", () => {
    render(<LoadingButton />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
