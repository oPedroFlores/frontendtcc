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
        'Authorization': 'Bearer '+token,
        'Content-Type': 'application/json',
      },
    },
  };
}
