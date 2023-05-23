import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Filter from "./Filter";

describe("Filter", () => {
  const label = "Filter";
  const items = ["All", "T-Shirt", "Shirt", "Pants", "Shorts"];
  let component;
  beforeEach(() => {
    const res = render(<Filter label={label} items={items} />);
    component = res.container;
  });

  test("should render Filter component", () => {
    expect(component).toMatchSnapshot();
  });

  test("should render label", () => {
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  test("should render items", () => {
    items.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });
});
