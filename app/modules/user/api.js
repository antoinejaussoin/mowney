/* eslint no-undef:0 */

import 'isomorphic-fetch';

export const login = (username, password) => fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: username,
    password
  })
}).then(response => {
  if (response.status >= 500) {
    throw new Error('An error occured on the server');
  }
  if (response.status === 401) {
    throw new Error(response.text());
  }
  return response.json();
});

export const reAuthenticate = token => fetch('/api/auth/re-auth', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    token
  })
}).then(response => {
  if (response.status >= 400) {
    throw new Error('Bad response from server');
  }
  return response.json();
});

export const logout = () => {

};
