export const API_URL = 'http://localhost:8080';

export function LOGIN_AUTHENTICATE(body) {
  return {
    url: API_URL + '/authenticate',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function USER_REGISTER(body) {
  return {
    url: API_URL + '/users',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function AUTO_LOGIN(token) {
  return {
    url: API_URL + '/user',
    options: {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    },
  };
}

// Workers

export function GET_WORKERS(token) {
  return {
    url: API_URL + '/workers',
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function SET_WORKER(token, body) {
  return {
    url: API_URL + '/workers',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(body),
    },
  };
}
