import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { getToken } from 'modules/user/selectors';
import { fetchTransactions } from './api';
import { receiveTransactions, LOAD_ACCOUNT_TRANSACTIONS } from './state';
import { listOfTransactionsModel } from '../model';

export function* onLoadTransactions({ payload }) {
    try {
        const token = yield select(getToken);
        if (token) {
            const data = yield call(fetchTransactions, token, payload, 50);
            const { result, entities: { transactions } } = normalize(data, listOfTransactionsModel);
            yield put(receiveTransactions({ entities: transactions, list: result }));
            yield put(receiveTransactions(data));
        }
    } catch (e) {
        console.error('Get Transactions error: ', e);
    }
}

export default function* watchers() {
    yield [
        takeEvery(LOAD_ACCOUNT_TRANSACTIONS, onLoadTransactions)
    ];
}
