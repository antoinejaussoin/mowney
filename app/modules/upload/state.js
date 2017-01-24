import { createAction } from 'redux-actions';

export const ADD_FILE = 'mowney/upload/add';
export const UPLOAD_ALL = 'mowney/upload/upload-all';
export const UPLOAD_ALL_SUCCESS = 'mowney/upload/upload-all-success';

export default function reducer(state = {
    files: {},
    uploading: false,
    error: null
}, { type, payload }) {
    switch (type) {
    case ADD_FILE:
        return {
            ...state,
            files: {
                ...state.files,
                [payload.account.id]: payload.file
            }
        };
    case UPLOAD_ALL:
        return {
            ...state,
            uploading: true
        };
    case UPLOAD_ALL_SUCCESS:
        return {
            ...state,
            uploading: false,
            files: {}
        };
    default:
        return state;
    }
}

export const addFile = createAction(ADD_FILE);
export const uploadAll = createAction(UPLOAD_ALL);
export const uploadAllSuccess = createAction(UPLOAD_ALL_SUCCESS);
