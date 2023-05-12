import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Sidebar from "./Index";

describe("Sidebar", () => {
  it("should render the component", () => {
    render(<Sidebar />);

    expect(screen.getByText("Accueil")).toBeInTheDocument();
    expect(screen.getByText("Transactions")).toBeInTheDocument();
  });
});
