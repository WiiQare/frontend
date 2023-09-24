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
    console.log = jest.fn();
    fetch = jest.fn().mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValueOnce({
        hello: 'world',
      }),
    });
  });

  it('sendEmail', async () => {
    fetch = jest.fn().mockResolvedValueOnce({
      status: 200,
      hello: 'world',
    });

    const response = await sendEmail({ test: 'payload' });

    expect(response).toEqual({ status: 200, hello: 'world' });
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
    fetch = jest.fn().mockResolvedValueOnce({
      status: 200,
      hello: 'world',
    });
    const response = await sendEmailReset({ test: 'payload' });

    expect(response).toEqual({ status: 200, hello: 'world' });
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
    fetch = jest.fn().mockResolvedValueOnce({
      status: 200,
      hello: 'world',
    });
    const response = await sendSMSHash({ test: 'payload' });

    expect(response).toEqual({ status: 200, hello: 'world' });
  });

  it('addPlan', async () => {
    const response = await addPlan({ test: 'payload' });

    expect(response).toEqual({ hello: 'world' });
  });

  it('authlogic', async () => {
    fetch = jest.fn().mockResolvedValueOnce({
      status: 200,
      hello: 'world',
    });
    const response = await authlogic({ test: 'payload' });

    expect(response).toEqual({ status: 200, hello: 'world' });
  });

  it('saveOperation', async () => {
    const response = await saveOperation({ test: 'payload' });

    expect(response).toEqual({ hello: 'world' });
  });
});

describe('Helper functions errors', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.log = jest.fn();
    fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockRejectedValueOnce(new Error('test')),
    });
  });

  it('sendEmail', async () => {
    fetch = jest.fn().mockRejectedValueOnce(new Error('test'));

    const res = await sendEmail({ test: 'payload' });
    expect(res).toEqual(new Error('test'));
  });

  it('sendOtp', async () => {
    const response = await sendOtp({ test: 'payload' });

    expect(response).toEqual(new Error('test'));
  });

  it('register', async () => {
    const response = await register({ test: 'payload' });

    expect(response).toEqual(new Error('test'));
  });

  it('login', async () => {
    const response = await login({ test: 'payload' });

    expect(response).toEqual(new Error('test'));
  });

  it('autocomplete', async () => {
    const response = await autocomplete({ test: 'payload' });

    expect(response).toEqual(new Error('test'));
  });

  it('savePatient', async () => {
    const response = await savePatient({ test: 'payload' });

    expect(response).toEqual(new Error('test'));
  });

  it('convertCurrency', async () => {
    const response = await convertCurrency({ test: 'payload' });

    expect(response).toEqual(new Error('test'));
  });

  it('sendEmailReset', async () => {
    fetch = jest.fn().mockRejectedValueOnce(new Error('test'));

    const response = await sendEmailReset({ test: 'payload' });

    expect(response).toEqual(new Error('test'));
  });

  it('resetPassword', async () => {
    const response = await resetPassword({ test: 'payload' });

    expect(response).toEqual(new Error('test'));
  });

  it('sendMessage', async () => {
    const response = await sendMessage({ test: 'payload' });

    expect(response).toEqual(new Error('test'));
  });

  it('invitationFriend', async () => {
    const response = await invitationFriend({ test: 'payload' });

    expect(response).toEqual(new Error('test'));
  });

  it('sendSMSHash', async () => {
    fetch = jest.fn().mockRejectedValueOnce(new Error('test'));

    const response = await sendSMSHash({ test: 'payload' });

    expect(response).toEqual(new Error('test'));
  });

  it('addPlan', async () => {
    const response = await addPlan({ test: 'payload' });

    expect(response).toEqual(new Error('test'));
  });

  it('authlogic', async () => {
    fetch = jest.fn().mockRejectedValueOnce(new Error('test'));

    const response = await authlogic({ test: 'payload' });

    expect(response).toEqual(new Error('test'));
  });

  it('saveOperation', async () => {
    const response = await saveOperation({ test: 'payload' });

    expect(response).toEqual(new Error('test'));
  });
});
