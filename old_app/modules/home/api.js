/* eslint no-undef:0 */

import 'isomorphic-fetch';

const getHeaders = token => {
  const headers = new Headers();
  headers.append('x-access-token', token);
  return headers;
};

const fetchUrl = (token, url) => fetch(url, {
  headers: getHeaders(token)
})
  .then(response => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    return response.json();
  });

export const fetchSummary = (token, currency) => fetchUrl(token, `/api/account/summary/${currency}`);
export const fetchSaving = (token, name, currency) => fetchUrl(token, `/api/account/saving/${currency}/${name}`);
export const fetchTimeline = (token, currency) => fetchUrl(token, `/api/account/timeline/${currency}`);
export const fetchSavingsPerYear = (token, currency) => fetchUrl(token, `/api/account/savings-per-year/${currency}`);
