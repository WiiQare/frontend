import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import ItemHistory from "./ItemHistory";
import { QueryClientProvider, QueryClient } from "react-query";

describe("ItemHistory", () => {
  let component;
  beforeEach(() => {
    const client = new QueryClient();
    const res = render(
      <QueryClientProvider client={client}>
        <ItemHistory
          patient={{ firstName: "John" }}
          createdAt="2023-02-01"
          senderCurrency="USD"
          voucher={{ id: 1, amount: 100, currency: "USD" }}
          currency={"USD"}
          sender={{ firstName: "John" }}
        />
      </QueryClientProvider>
    );
    component = res.container;
  });

  it("should render the component", () => {
    expect(component).toMatchSnapshot();
  });
});
