/* eslint no-undef:0 */

const getHeaders = token => {
    const headers = new Headers();
    headers.append('x-access-token', token);
    return headers;
};

export const fetchAccounts = (token) => fetch('/api/account/list', {
    headers: getHeaders(token)
})
.then(response => {
    if (response.status >= 400) {
        throw new Error('Bad response from server');
    }
    return response.json();
});
