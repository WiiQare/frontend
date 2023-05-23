import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Country from "./Country";
import { CountryContext } from "../Stepper/Forms/identity2";

describe("Country", () => {
  let component;
  beforeEach(() => {
    const res = render(
      <CountryContext.Provider value={{ country: "Indonesia" }}>
        <Country />
      </CountryContext.Provider>
    );
    component = res.container;
  });

  test("should render Country component", () => {
    expect(component).toMatchSnapshot();
  });
});
