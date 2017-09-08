import { all, takeEvery, put, select, call } from 'redux-saga/effects';
import { getToken } from 'modules/user/selectors';
import { closeModal, ASSIGN_CATEGORY, assignCategorySuccess } from './state';
import { getSelectedTransactions } from '../list/selectors';
import { selectCategory } from './selectors';
import { categoriseTransaction } from '../api';

export function* onAssignCategory() {
  const token = yield select(getToken);
  const selectedTransactions = yield select(getSelectedTransactions);
  const categoryId = yield select(selectCategory);
  console.log('Selected:', selectedTransactions, categoryId);
  for (let i = 0; i < selectedTransactions.length; i++) {
    const transactionId = selectedTransactions[i];
    yield call(categoriseTransaction, token, transactionId, categoryId);
    yield put(assignCategorySuccess(transactionId, categoryId));
  }
  yield put(closeModal());
}

export default function* watchers() {
  yield all([
    takeEvery(ASSIGN_CATEGORY, onAssignCategory)
  ]);
}
