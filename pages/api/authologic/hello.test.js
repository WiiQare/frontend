import hello from '.././hello'; // assuming the code is in a file named 'handler.js'

describe('handler function', () => {
    it('should respond with status 200 and JSON containing name "John Doe"', () => {
        // Mocking the request and response objects
        const req = {};
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };

        // Calling the handler function with the mock request and response
        hello(req, res);

        // Assertions
        expect(res.status).toHaveBeenCalledWith(200); // Ensure status code is set to 200
        expect(res.json).toHaveBeenCalledWith({ name: 'John Doe' }); // Ensure JSON response contains the expected name
    });
});
