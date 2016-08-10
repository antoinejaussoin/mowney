import { call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { login, logout } from '../api/auth';
import { loginSuccess } from '../state/user';

export function* onLogin(action) {
    console.log(action);
    try {
        const user = yield call(login, action.payload.username, action.payload.password);
        yield put(loginSuccess(user));
        yield put(push('/'));
    } catch (e) {
        console.error('Auth error: ', e);
    }
}

export function* onLogout(action) {
    console.log(action);
    yield call(logout);
}
