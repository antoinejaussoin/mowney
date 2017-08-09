import { all, takeEvery, call, put, select } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { getToken } from 'modules/user/selectors';
import { fetchTransactions, fetchAllTransactions } from '../api';
import { receiveTransactions, LOAD_ACCOUNT_TRANSACTIONS, LOAD_ALL_ACCOUNT_TRANSACTIONS } from './state';
import { listOfTransactionsModel } from '../../model';

function* loadTransactions(accountId, apiFn) {
  try {
    const token = yield select(getToken);
    if (token) {
      const data = yield call(apiFn, token, accountId, 50);
      const { result, entities: { transactions } } = normalize(data, listOfTransactionsModel);
      yield put(receiveTransactions({ entities: transactions, list: result }));
    }
  } catch (e) {
    console.error('Get Transactions error: ', e);
  }
}

export function* onLoadTransactions({ payload }) {
  yield loadTransactions(payload, fetchTransactions);
}

export function* onLoadAllTransactions({ payload }) {
  yield loadTransactions(payload, fetchAllTransactions);
}

export default function* watchers() {
  yield all([
    takeEvery(LOAD_ACCOUNT_TRANSACTIONS, onLoadTransactions),
    takeEvery(LOAD_ALL_ACCOUNT_TRANSACTIONS, onLoadAllTransactions)
  ]);
}
