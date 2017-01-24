import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { getToken } from 'modules/user/selectors';
import { fetchAccounts } from './api';
import { receiveAccounts, LOAD_ACCOUNTS } from './state';

export function* onLoadAccounts() {
    try {
        const token = yield select(getToken);
        const accounts = yield call(fetchAccounts, token);
        yield put(receiveAccounts(accounts));
    } catch (e) {
        console.error('Get Accounts error: ', e);
    }
}

export default function* watchers() {
    yield [
        takeEvery(LOAD_ACCOUNTS, onLoadAccounts)
    ];
}
