const API_URL = 'http://localhost:8080';

const createUser = (token: any) => {
  const tokenSplit = token.split('.');
  const tokenPayload = tokenSplit[1];
  const tokenJson = atob(tokenPayload);
  const tokenUser = JSON.parse(tokenJson);
  return tokenUser;
};

export const authenticate = async (user: any) => {
  const init = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(user),
  };

  const res = await fetch(`${API_URL}/authenticate`, init);
  if (res.ok) {
    const data = await res.json();
    const token = data.jwt_token;
    localStorage.setItem('jtw', token);
    const user = createUser(token);
    return Promise.resolve(user);
  } else {
    return Promise.reject();
  }
};

export const refreshToken = async () => {
  const init = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  };

  const res = await fetch(`${API_URL}/refresh_token`, init);
  if (res.ok) {
    const data = await res.json();
    const token = data.jwt_token;
    localStorage.setItem('jtw', token);
    const user = createUser(token);
    return Promise.resolve(user);
  } else {
    return Promise.reject();
  }
};

export const createAccount = async (newUser: any) => {
  const init = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(newUser),
  };

  const res = await fetch(`${API_URL}/create_account`, init);
  if (res.ok) {
    return Promise.resolve();
  } else {
    const err = await res.json();
    return Promise.reject(err);
  }
};
