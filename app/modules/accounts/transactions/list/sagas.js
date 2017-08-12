import { all, takeEvery, put } from 'redux-saga/effects';
import { loadEntities } from 'modules/entities/sagas';
import { listOfTransactionsModel } from 'models';
import { receiveTransactions, LOAD_ACCOUNT_TRANSACTIONS, LOAD_ALL_ACCOUNT_TRANSACTIONS } from './state';

export function* onLoadTransactions({ payload }) {
  const ids = yield loadEntities(`/account/${payload}/transactions/50`, listOfTransactionsModel);
  yield put(receiveTransactions(ids));
}

export function* onLoadAllTransactions({ payload }) {
  const ids = yield loadEntities(`/account/${payload}/transactions/9999999`, listOfTransactionsModel);
  yield put(receiveTransactions(ids));
}

export default function* watchers() {
  yield all([
    takeEvery(LOAD_ACCOUNT_TRANSACTIONS, onLoadTransactions),
    takeEvery(LOAD_ALL_ACCOUNT_TRANSACTIONS, onLoadAllTransactions)
  ]);
}
