import { createAction } from 'redux-actions';

export const LOGIN = 'mowney/user/login';
export const LOGIN_SUCCESS = 'mowney/user/login-success';
export const LOGIN_FAILURE = 'mowney/user/login-failure';
export const LOGOUT = 'mowney/user/logout';
export const CHANGE_LANGUAGE = 'mowney/user/language/change';
export const CHANGE_LANGUAGE_SUCCESS = 'mowney/user/language/change-success';

const defaultState = {
  username: null,
  token: null,
  pending: false,
  error: null
};

export default function reducer(state = {
  ...defaultState,
  lang: 'en'
}, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      ...defaultState,
      pending: true
    };
  case LOGIN_SUCCESS:
    return {
      ...state,
      ...defaultState,
      ...action.payload.user,
      token: action.payload.token
    };
  case LOGIN_FAILURE:
    return {
      ...state,
      ...defaultState,
      error: action.payload
    };
  case CHANGE_LANGUAGE_SUCCESS:
    return {
      ...state,
      lang: action.payload
    };
  case LOGOUT:
    return {
      ...state,
      ...defaultState
    };
  default:
    return state;
  }
}

export const login = createAction(LOGIN);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const loginFailure = createAction(LOGIN_FAILURE);
export const logout = createAction(LOGOUT);
export const changeLanguage = createAction(CHANGE_LANGUAGE);
