/* eslint no-undef:0 */

const getHeaders = token => {
  const headers = new Headers();
  headers.append('x-access-token', token);
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');
  return headers;
};

export const postTransaction = (token, accountId, date, amount, description) => fetch(`/api/transaction/${accountId}`, {
  headers: getHeaders(token),
  method: 'POST',
  body: JSON.stringify({
    date,
    description,
    amount
  })
})
  .then(response => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    return response.json();
  });

export const deleteTransactions = (token, ids) => fetch('/api/transaction/delete-batch', {
  headers: getHeaders(token),
  method: 'POST',
  body: JSON.stringify({
    ids
  })
})
  .then(response => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
  });

export const toggleIsActive = (token, id) => fetch(`/api/account/${id}/toggle-active`, {
  headers: getHeaders(token),
  method: 'PUT'
})
  .then(response => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
  });

export const toggleIsStatEnabled = (token, id) => fetch(`/api/account/${id}/toggle-stat-enabled`, {
  headers: getHeaders(token),
  method: 'PUT'
})
  .then(response => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
  });

export const postCategoriseAll = (token) => fetch('/api/category/categorise-all', {
  headers: getHeaders(token),
  method: 'POST'
})
  .then(response => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
  });

export const categoriseTransaction = (token, transactionId, categoryId) => fetch(`/api/transaction/categorise/${transactionId}`, {
  headers: getHeaders(token),
  method: 'PATCH',
  body: JSON.stringify({
    categoryId
  })
})
  .then(response => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
  });
