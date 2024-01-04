import Stripe from "stripe";
import handler from "./saving";

jest.mock("stripe", () => {
  return jest.fn().mockImplementation(() => {
    return {
      paymentIntents: {
        create: jest.fn().mockResolvedValueOnce({
          client_secret: "secret",
        }).mockRejectedValueOnce(new Error("error")),
      },
    };
  });
});

describe("saving", () => {
  it("should return a client secret", async () => {
    console.log = jest.fn();

    const req = {
      body: {
        idSaving: "123",
        amount: 100,
        currency: "USD",
      },
    };

    const res = {
      send: jest.fn(),
    };

    await handler(req, res);

    expect(res.send).toHaveBeenCalledWith({
      clientSecret: expect.any(String),
    });
  });

  it("should log error", async () => {
    console.log = jest.fn();

    const req = {
      body: {
        idSaving: "123",
        amount: 100,
        currency: "USD",
      },
    };

    const res = {
      send: jest.fn(),
    };

    Stripe.mockImplementationOnce(() => {
      throw new Error("error");
    });

    await handler(req, res);

    expect(console.log).toHaveBeenCalledWith("api/saving", new Error("error"));
  });
});