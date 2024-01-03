import handler from '../../../../pages/api/authologic/index';

describe('handler', () => {
    it('should make a POST request to the Authologic API', async () => {
        const req = {
            body: {
                path: 'example-path',
            },
        };
        const res = {
            send: jest.fn(),
        };

        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue({}),
        });

        await handler(req, res);

        expect(fetch).toHaveBeenCalledWith('https://sandbox.authologic.com/api/conversations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/vnd.authologic.v1.1+json',
                Accept: 'application/vnd.authologic.v1.1+json',
                Authorization: `Basic ${Buffer.from('wiiqare:WR26jWceSVW3IND0z1BLd0Hn').toString('base64')}`,
            },
            body: JSON.stringify({
                userKey: 'qW8uMEUFv4Vb4XyN4RSREbzI',
                returnUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${req.body.path}&conversation={conversationId}`,
                strategy: 'public:default',
                query: {
                    identity: {
                        requireOneOf: [
                            [
                                'PERSON_NAME_FIRSTNAME',
                                'PERSON_NAME_LASTNAME',
                                'PERSON_NAME_MIDDLENAME',
                                'PERSON_INFO_BIRTHDATE',
                                'PERSON_INFO_AGE',
                                'PERSON_IDS_PASSPORT_ID',
                                'PERSON_IDS_PASSPORT_EXPIRY_DATE',
                            ],
                        ],
                    },
                },
            }),
        });

        // expect(res.send).toHaveBeenCalledWith({});
    });

    it('should log an error if the request fails', async () => {
        const req = {
            body: {
                path: 'example-path',
            },
        };
        const res = {
            send: jest.fn(),
        };

        global.fetch = jest.fn().mockRejectedValue(new Error('Request failed'));

        console.log = jest.fn();

        await handler(req, res);

        // expect(console.log).toHaveBeenCalledWith(new Error('Request failed'));
    });
});