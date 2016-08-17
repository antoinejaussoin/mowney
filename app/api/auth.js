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
    if (response.status >= 400) {
        throw new Error('Bad response from server');
    }
    return response.json();
});

export const logout = () => {

};
