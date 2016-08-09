import { call } from 'redux-saga/effects';
import { login, logout } from '../api/auth';

export function* onLogin(action) {
    console.log(action);
    const res = yield call(login, action.payload.username, action.payload.password);
    console.log(res);
}

export function* onLogout(action) {
    console.log(action);
    yield call(logout);
}
