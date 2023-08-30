export default async function handler(req, res) {
  try {
    fetch(`https://sandbox.authologic.com/api/conversations/${req.body.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/vnd.authologic.v1.1+json',
        Accept: 'application/vnd.authologic.v1.1+json',
        Authorization: `Basic ${Buffer.from(
          'wiiqare:WR26jWceSVW3IND0z1BLd0Hn',
        ).toString('base64')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => res.send({ ...data }))
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
}
