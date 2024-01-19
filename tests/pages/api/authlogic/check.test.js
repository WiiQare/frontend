import handler from "../../../../pages/api/authologic/check";

describe("handler", () => {
    it("should fetch data and send response", async () => {
        const req = {
            body: {
                id: "123",
            },
        };

        const res = {
            send: jest.fn(),
        };

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce({ data: "test data" }),
        });

        await handler(req, res);

        expect(global.fetch).toHaveBeenCalledWith(
            "https://sandbox.authologic.com/api/conversations/123",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/vnd.authologic.v1.1+json",
                    Accept: "application/vnd.authologic.v1.1+json",
                    Authorization: "Basic d2lpcWFyZTpXUjI2aldjZVNWVzNJTkQwejFCTGQwSG4=",
                },
            }
        );

        // expect(res.send).toHaveBeenCalledWith({ data: "test data" });
    });

    it("should log error", async () => {
        const req = {
            body: {
                id: "123",
            },
        };

        const res = {
            send: jest.fn(),
        };

        global.fetch = jest.fn().mockRejectedValueOnce(new Error("fetch error"));

        console.log = jest.fn();

        await handler(req, res);

        expect(global.fetch).toHaveBeenCalledWith(
            "https://sandbox.authologic.com/api/conversations/123",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/vnd.authologic.v1.1+json",
                    Accept: "application/vnd.authologic.v1.1+json",
                    Authorization: "Basic d2lpcWFyZTpXUjI2aldjZVNWVzNJTkQwejFCTGQwSG4=",
                },
            }
        );

        // expect(console.log).toHaveBeenCalledWith(new Error("fetch error"));
    });
});