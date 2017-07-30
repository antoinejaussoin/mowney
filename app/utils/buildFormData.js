import forIn from 'lodash/forIn';

export default data => {
    const formData = new FormData();

    forIn(data, (value, key) => {
        formData.append(key, value);
    });

    return formData;
};
