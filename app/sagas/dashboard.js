import { call, put, select } from 'redux-saga/effects';
import { fetchSummary } from '../api/dashboard';
import { receiveSummary } from '../state/dashboard';
import { getToken } from '../selectors/user';

export function* onGetSummary() {
    try {
        const token = yield select(getToken);
        const summary = yield call(fetchSummary, token, 'GBP');
        yield put(receiveSummary(summary));
    } catch (e) {
        console.error('Auth error: ', e);
    }
}

export function* onLoadDashboard() {
    yield call(onGetSummary);
}
