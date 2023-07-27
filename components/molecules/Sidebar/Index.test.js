import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Sidebar from "./Index";
import { DrawContext } from "../../../pages/_app";

describe("Sidebar", () => {
  it("should render the component", () => {
    render(
      <DrawContext.Provider value={{ hideSide: true }}>
        <Sidebar />
      </DrawContext.Provider>
    );

    expect(screen.getByText("Accueil")).toBeInTheDocument();
    expect(screen.getByText("Transactions")).toBeInTheDocument();
  });
});
