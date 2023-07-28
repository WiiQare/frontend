import "@testing-library/jest-dom";
import Index from "./index";
import { render } from "@testing-library/react";
import { DrawContext } from "./_app";
import { SessionProvider } from "next-auth/react";
require("jest-fetch-mock").enableMocks();

fetch.mockResponse("[]");

describe("Index page", () => {
  it("should render the index page", () => {
    const { container } = render(
      <SessionProvider session={{ user: { data: { userId: "random123" } } }}>
        <DrawContext.Provider
          value={{
            draw: false,
            setDraw: jest.fn(),
            hideSide: false,
            setHideSide: jest.fn(),
          }}
        >
          <Index />
        </DrawContext.Provider>
      </SessionProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
