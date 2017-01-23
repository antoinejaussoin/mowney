import { call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import ls from 'local-storage';
import { loginSuccess } from 'modules/user/state';
import { loadDashboard } from 'modules/home/state';
import { reAuthenticate } from 'modules/user/api';
import { initialLoad } from './state';

function* doReAuthenticate() {
    console.log('reauth');
    const userAndToken = yield call(ls, 'token');
    if (userAndToken) {
        const validatedUserAndToken = yield call(reAuthenticate, userAndToken.token);
        if (validatedUserAndToken) {
            yield put(loginSuccess(validatedUserAndToken));
            yield put(initialLoad());
            yield put(push('/'));
        }
    }
}

export function* onInitialise() {
    yield call(doReAuthenticate);
}

export function* onInitialLoad() {
    yield put(loadDashboard());
}
