import { all, takeEvery, call, put, select } from 'redux-saga/effects';
import { getToken } from 'modules/user/selectors';
import { loadDashboard } from 'modules/home/state';
import { deleteTransactions } from '../api';
import { deleteSelectedTransactionsSuccess, deleteSelectedTransactionsFailure, DELETE_SELECTED_TRANSACTIONS } from './state';
import { getSelectedTransactions } from '../list/selectors';

export function* onDeleteTransactions() {
  try {
    const token = yield select(getToken);
    const ids = yield select(getSelectedTransactions);
    if (token) {
      yield call(deleteTransactions, token, ids);
      yield put(deleteSelectedTransactionsSuccess(ids));
      yield put(loadDashboard());
    }
  } catch (e) {
    console.error('Get Transactions error: ', e);
    yield put(deleteSelectedTransactionsFailure(e.message));
  }
}

export default function* watchers() {
  yield all([
    takeEvery(DELETE_SELECTED_TRANSACTIONS, onDeleteTransactions)
  ]);
}
