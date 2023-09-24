import {
  addPlan,
  authlogic,
  autocomplete,
  convertCurrency,
  invitationFriend,
  login,
  register,
  resetPassword,
  saveOperation,
  savePatient,
  sendEmail,
  sendEmailReset,
  sendMessage,
  sendOtp,
  sendSMSHash,
} from './helper';

describe('Helper functions', () => {
  beforeEach(() => {
    fetch = jest.fn().mockResolvedValueOnce({
      statusCode: 200,
      json: jest.fn().mockResolvedValueOnce({
        hello: 'world',
      }),
    });
  });

  it('sendEmail', async () => {
    const response = await sendEmail({ test: 'payload' });

    expect(response).toEqual({ hello: 'world' });
  });

  it('sendOtp', async () => {
    const response = await sendOtp({ test: 'payload' });

    expect(response).toEqual({ hello: 'world' });
  });

  it('register', async () => {
    const response = await register({ test: 'payload' });

    expect(response).toEqual({ hello: 'world' });
  });

  it('login', async () => {
    const response = await login({ test: 'payload' });

    expect(response).toEqual({ hello: 'world' });
  });

  it('autocomplete', async () => {
    const response = await autocomplete({ test: 'payload' });

    expect(response).toEqual({ hello: 'world' });
  });

  it('savePatient', async () => {
    const response = await savePatient({ test: 'payload' });

    expect(response).toEqual({ hello: 'world' });
  });

  it('convertCurrency', async () => {
    const response = await convertCurrency({ test: 'payload' });

    expect(response).toEqual({ hello: 'world' });
  });

  it('sendEmailReset', async () => {
    const response = await sendEmailReset({ test: 'payload' });

    expect(response).toEqual({ hello: 'world' });
  });

  it('resetPassword', async () => {
    const response = await resetPassword({ test: 'payload' });

    expect(response).toEqual({ hello: 'world' });
  });

  it('sendMessage', async () => {
    const response = await sendMessage({ test: 'payload' });

    expect(response).toEqual({ hello: 'world' });
  });

  it('invitationFriend', async () => {
    const response = await invitationFriend({ test: 'payload' });

    expect(response).toEqual({ hello: 'world' });
  });

  it('sendSMSHash', async () => {
    const response = await sendSMSHash({ test: 'payload' });

    expect(response).toEqual({ hello: 'world' });
  });

  it('addPlan', async () => {
    const response = await addPlan({ test: 'payload' });

    expect(response).toEqual({ hello: 'world' });
  });

  it('authlogic', async () => {
    const response = await authlogic({ test: 'payload' });

    expect(response).toEqual({ hello: 'world' });
  });

  it('saveOperation', async () => {
    const response = await saveOperation({ test: 'payload' });

    expect(response).toEqual({ hello: 'world' });
  });
});
