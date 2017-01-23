/* eslint no-undef:0 */

import 'isomorphic-fetch';

const getHeaders = token => {
    const headers = new Headers();
    headers.append('x-access-token', token);
    return headers;
};

export const fetchSummary = (token, currency) => fetch(`/api/account/summary/${currency}`, {
    headers: getHeaders(token)
})
.then(response => {
    if (response.status >= 400) {
        throw new Error('Bad response from server');
    }
    return response.json();
});

export const fetchSaving = (token, name, currency) =>
fetch(`/api/account/saving/${currency}/${name}`, {
    headers: getHeaders(token)
})
.then(response => {
    if (response.status >= 400) {
        throw new Error('Bad response from server');
    }
    return response.json();
});

export const fetchTimeline = (token, currency) =>
fetch(`/api/account/timeline/${currency}`, {
    headers: getHeaders(token)
})
.then(response => {
    if (response.status >= 400) {
        throw new Error('Bad response from server');
    }
    return response.json();
});
