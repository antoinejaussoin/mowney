/* eslint no-undef:0 */

const getHeaders = token => {
  const headers = new Headers();
  headers.append('x-access-token', token);
  return headers;
};

export const fetchTransactions = (token, accountId, count) => fetch(`/api/account/${accountId}/transactions/${count}`, {
  headers: getHeaders(token)
})
  .then(response => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    return response.json();
  });

export const fetchAllTransactions = (token, accountId) => fetch(`/api/account/${accountId}/transactions/9999999`, {
  headers: getHeaders(token)
})
  .then(response => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    return response.json();
  });
