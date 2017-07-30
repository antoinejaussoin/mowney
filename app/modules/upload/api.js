import buildFormData from 'utils/buildFormData';

const getHeaders = token => {
    const headers = new Headers();
    headers.append('x-access-token', token);
    return headers;
};

export const uploadFile = (token, accountId, file) =>
    fetch(`/api/account/upload/${accountId}`, {
        method: 'post',
        credentials: 'include',
        headers: getHeaders(token),
        body: buildFormData({
            file
        })
    }).then(response => {
        if (response.status >= 400) {
            throw new Error('Bad response');
        }

        return response.json();
    });
