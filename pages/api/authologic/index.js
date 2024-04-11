export default async function handler(req, res) {
  try {
    fetch('https://sandbox.authologic.com/api/conversations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/vnd.authologic.v1.1+json',
        Accept: 'application/vnd.authologic.v1.1+json',
        Authorization: `Basic ${Buffer.from(
          'wiiqare:WR26jWceSVW3IND0z1BLd0Hn',
        ).toString('base64')}`,
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
    })
      .then((response) => response.json())
      .then((data) => res.send({ ...data }))
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
}
