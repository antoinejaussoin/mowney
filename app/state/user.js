import { createAction } from 'redux-actions';

export const LOGIN = 'mowney/user/login';
export const LOGIN_SUCCESS = 'mowney/user/login-success';
export const LOGOUT = 'mowney/user/logout';
export const CHANGE_LANGUAGE = 'mowney/user/language/change';
export const CHANGE_LANGUAGE_SUCCESS = 'mowney/user/language/change-success';

export default function reducer(state = {
    username: null,
    lang: 'en'
}, action) {
    switch (action.type) {
    case LOGIN_SUCCESS:
        return {
            ...state,
            ...action.payload.user,
            token: action.payload.token
        };
    case CHANGE_LANGUAGE_SUCCESS:
        return {
            ...state,
            lang: action.payload
        };
    case LOGOUT:
        return {
            ...state,
            username: null,
            token: null
        };
    default:
        return state;
    }
}

export const login = createAction(LOGIN);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const logout = createAction(LOGOUT);
export const changeLanguage = createAction(CHANGE_LANGUAGE);
