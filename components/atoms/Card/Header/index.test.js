import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CardHeader from ".";

describe("Card Header", () => {
  it("should render the component", () => {
    const title = "Title";
    render(<CardHeader title={title} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });
  it("should render the breadcrumbs", () => {
    const title = "Title";
    const breadcrumbs = [
      { item: "Home", link: "/" },
      { item: "Library", link: "/library" },
    ];
    render(<CardHeader title={title} breadcrumbs={breadcrumbs} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Library")).toBeInTheDocument();
  });

  it("should render the print button", () => {
    const title = "Title";
    const print = true;
    render(<CardHeader title={title} print={print} />);
    expect(screen.getByText("Print")).toBeInTheDocument();
  });

  it("should render the download button", () => {
    const title = "Title";
    const download = true;
    render(<CardHeader title={title} download={download} />);
    expect(screen.getByText("Télécharger le rapport")).toBeInTheDocument();
  });
});
