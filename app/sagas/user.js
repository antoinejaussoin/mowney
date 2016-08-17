import { call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import ls from 'local-storage';
import { login, logout } from '../api/auth';
import { loginSuccess } from '../state/user';
import { initialLoad } from '../state/actions';

export function* onLogin(action) {
    console.log(action);
    try {
        const userAndToken = yield call(login, action.payload.username, action.payload.password);
        yield put(loginSuccess(userAndToken));
        yield call(ls, 'token', userAndToken);
        yield put(initialLoad());
        yield put(push('/'));
    } catch (e) {
        console.error('Auth error: ', e);
    }
}

export function* onLogout(action) {
    console.log(action);
    yield call(logout);
}
