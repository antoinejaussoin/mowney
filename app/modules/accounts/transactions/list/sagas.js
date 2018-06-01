import { all, takeEvery, put, take, select } from 'redux-saga/effects';
import { loadEntities } from 'modules/entities/sagas';
import { INITIALISE_SUCCESS } from 'modules/app/state';
import { selectIsInitialised } from 'modules/app/selectors';
import { listOfTransactionsModel } from 'models';
import { receiveTransactions, LOAD_ACCOUNT_TRANSACTIONS, LOAD_ALL_ACCOUNT_TRANSACTIONS } from './state';

export function* onLoadTransactions({ payload }) {
  const isInitialised = yield select(selectIsInitialised);
  if (!isInitialised) {
    yield take(INITIALISE_SUCCESS);
  }
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
