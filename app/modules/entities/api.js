/* eslint no-undef:0 */

const getHeaders = token => {
  const headers = new Headers();
  headers.append('x-access-token', token);
  return headers;
};

export const fetchEntities = (token, url) => fetch(`/api${url}`, {
  headers: getHeaders(token)
})
  .then(response => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    return response.json();
  });
