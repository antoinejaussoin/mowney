import { call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { login, logout } from '../api/auth';
import { loginSuccess } from '../state/user';
import { loadDashboard } from '../state/dashboard';

export function* onLogin(action) {
    console.log(action);
    try {
        const userAndToken = yield call(login, action.payload.username, action.payload.password);
        yield put(loginSuccess(userAndToken));
        yield put(push('/'));
        yield put(loadDashboard());
    } catch (e) {
        console.error('Auth error: ', e);
    }
}

export function* onLogout(action) {
    console.log(action);
    yield call(logout);
}
