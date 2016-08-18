import { call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import ls from 'local-storage';
import { reAuthenticate } from '../api/auth';
import { loginSuccess } from '../state/user';
import { initialLoad } from '../state/actions';
import { loadDashboard } from '../state/dashboard';

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
