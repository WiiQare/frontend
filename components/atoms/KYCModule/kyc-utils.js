
export async function authlogic() {
    try {
      const Options = {
        method: 'POST',
        mode: 'opaque',
        headers: {
          'Content-Type': 'application/vnd.authologic.v1.1+json',
          Accept: 'application/vnd.authologic.v1.1+json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Basic ${Buffer.from(
            'wiiqare:WR26jWceSVW3IND0z1BLd0Hn',
          ).toString('base64')}`,
        },
        body: JSON.stringify({
          userKey: 'qW8uMEUFv4Vb4XyN4RSREbzI',
          returnUrl:
            'https://authologic.com/tests/return/?conversation={conversationId}',
          strategy: 'public:sandbox',
          query: {
            identity: {
              requireOneOf: [['PERSON_NAME_FIRSTNAME', 'PERSON_NAME_LASTNAME']],
            },
          },
        }),
      };
  
      const response = await fetch(
        'https://sandbox.authologic.com/api/conversations',
        Options,
      );
  
      console.log('response', response);
      const json = response.status == 200 ? response : await response.json();
  
      return json;
    } catch (error) {
      return error;
    }
  }

export async function setKyc(formData) {
    try {
      let token = formData.accessToken;
  
      delete formData.accessToken;
  
      const Options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      };
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/payer/kyc`,
        Options,
      );
      const json = await response.json();
  
      return json;
    } catch (error) {
      return error;
    }
  }
  
  export async function checkKyc(formData) {
    try {
      let token = formData.accessToken;
  
      delete formData.accessToken;
  
      const Options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      };
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/payer/check-kyc`,
        Options,
      );
      const json = await response.json();
  
      return json;
    } catch (error) {
      return error;
    }
  }