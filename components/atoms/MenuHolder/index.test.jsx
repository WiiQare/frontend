import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MenuHolder from ".";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      resolvedLanguage: "en",
      changeLanguage: jest.fn(),
    },
  }),
}));

describe("MenuHolder", () => {
  it("should render the component", () => {
    const label = "Mock label";
    render(<MenuHolder href={"/"} label={label} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });
});
