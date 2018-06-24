import { all, takeEvery, call, put, select } from 'redux-saga/effects';
import { getToken } from 'modules/user/selectors';
import { loadDashboard } from 'modules/home/state';
import { deleteTransactions, toggleIsActive, toggleIsStatEnabled, postCategoriseAll } from '../api';
import { deleteSelectedTransactionsSuccess, deleteSelectedTransactionsFailure, categoriseAllSuccess,
  DELETE_SELECTED_TRANSACTIONS, TOGGLE_IS_ACTIVE, TOGGLE_IS_STAT_ENABLED, CATEGORISE_ALL } from './state';
import { getSelectedTransactions } from '../list/selectors';
import { loadTransactions } from '../list/state';

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

export function* onToggleIsActive({ payload }) {
  const accountId = payload;
  try {
    const token = yield select(getToken);
    if (token) {
      yield call(toggleIsActive, token, accountId);
      yield put(loadDashboard());
    }
  } catch (e) {
    console.error(e);
  }
}

export function* onToggleIsStatEnabled({ payload }) {
  const accountId = payload;
  try {
    const token = yield select(getToken);
    if (token) {
      yield call(toggleIsStatEnabled, token, accountId);
      yield put(loadDashboard());
    }
  } catch (e) {
    console.error(e);
  }
}

export function* onCategoriseall({ payload }) {
  try {
    const token = yield select(getToken);
    if (token) {
      yield call(postCategoriseAll, token);
      yield put(loadTransactions(payload));
      yield put(categoriseAllSuccess(payload));
    }
  } catch (e) {
    console.error(e);
  }
}

export default function* watchers() {
  yield all([
    takeEvery(DELETE_SELECTED_TRANSACTIONS, onDeleteTransactions),
    takeEvery(TOGGLE_IS_ACTIVE, onToggleIsActive),
    takeEvery(TOGGLE_IS_STAT_ENABLED, onToggleIsStatEnabled),
    takeEvery(CATEGORISE_ALL, onCategoriseall)
  ]);
}
