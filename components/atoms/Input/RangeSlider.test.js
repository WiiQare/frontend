import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RangeSlider from "./RangeSlider";

describe("RangeSlider", () => {
  test("should render RangeSlider component", () => {
    const initialMin = 0;
    render(<RangeSlider initialMin={initialMin} />);
    expect(screen.getByDisplayValue(initialMin)).toBeInTheDocument();
  });
});
