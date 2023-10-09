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

export function DELETE_WORKER(token, body) {
  return {
    url: API_URL + '/workers',
    options: {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(body),
    },
  };
}

export function WORKER_SERVICES(token, body) {
  return {
    url: API_URL + '/workerservices',
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

export function UPDATE_WORKER(token, body) {
  return {
    url: API_URL + '/workers',
    options: {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(body),
    },
  };
}

// Services

export function GET_SERVICES(token) {
  return {
    url: API_URL + '/services',
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function SET_SERVICE(token, body) {
  return {
    url: API_URL + '/services',
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

export function DELETE_SERVICE(token, body) {
  return {
    url: API_URL + '/services',
    options: {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(body),
    },
  };
}

export function UPDATE_SERVICE(token, body) {
  return {
    url: API_URL + '/services',
    options: {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(body),
    },
  };
}

// Calendar

export function GET_CALENDAR(token) {
  return {
    url: API_URL + '/calendar',
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function UPDATE_CALENDAR(token, body) {
  return {
    url: API_URL + '/calendar',
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

// Schedule

export function GET_SCHEDULE_WORKERS(body) {
  return {
    url: API_URL + '/schedule/workers',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function GET_SCHEDULE_SERVICES(body) {
  return {
    url: API_URL + '/schedule/services',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function GET_SCHEDULE_DATES(body) {
  return {
    url: API_URL + '/schedule/get/schedules',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function SET_SCHEDULE(token, body) {
  return {
    url: API_URL + '/schedule/set/schedule',
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

export function GET_SCHEDULE(token, body) {
  return {
    url: API_URL + '/schedule/info',
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
