/* eslint no-undef:0 */

const getHeaders = token => {
  const headers = new Headers();
  headers.append('x-access-token', token);
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');
  return headers;
};

export const fetchSearch = (token, search, currency, limit) => fetch('/api/transaction/search', {
  headers: getHeaders(token),
  method: 'POST',
  body: JSON.stringify({
    search,
    limit,
    currency
  })
})
  .then(response => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    return response.json();
  });
