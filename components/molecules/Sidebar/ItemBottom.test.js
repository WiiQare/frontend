import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ItemBottom from "./ItemBottom";
import { SlGlobe } from "react-icons/sl";

describe("ItemBottom", () => {
  it("should render the component", () => {
    const icon = ({ size, className }) => (
      <SlGlobe size={size} className={className} />
    );
    const title = "Transactions";
    render(<ItemBottom icon={icon} link={"/"} title={title} />);

    expect(screen.getByText(title)).toBeInTheDocument();
  });
});
