import { all, takeEvery, put, select, call } from 'redux-saga/effects';
import { getToken } from 'modules/user/selectors';
import { postClue } from 'modules/categories/api';
import { closeModal, ASSIGN_CATEGORY, CREATE_CLUE, assignCategorySuccess, createClueSuccess } from './state';
import { categoriseAll } from '../actions/state';
import { getSelectedTransactions } from '../list/selectors';
import { selectCategory } from './selectors';
import { categoriseTransaction } from '../api';

function* onCreateClue({ payload }) {
  try {
    const { str, isRegex, accountId } = payload;
    const token = yield select(getToken);
    const categoryId = yield select(selectCategory);
    const newClue = yield call(postClue, token, categoryId, isRegex, str);
    yield put(createClueSuccess(newClue));
    yield put(closeModal());
    yield put(categoriseAll(accountId));
  } catch (e) {
    console.error('Get search error: ', e);
    yield put(closeModal());
  }
}

export function* onAssignCategory() {
  const token = yield select(getToken);
  const selectedTransactions = yield select(getSelectedTransactions);
  const categoryId = yield select(selectCategory);
  for (let i = 0; i < selectedTransactions.length; i++) {
    const transactionId = selectedTransactions[i];
    yield call(categoriseTransaction, token, transactionId, categoryId);
    yield put(assignCategorySuccess(transactionId, categoryId));
  }
  yield put(closeModal());
}

export default function* watchers() {
  yield all([
    takeEvery(ASSIGN_CATEGORY, onAssignCategory),
    takeEvery(CREATE_CLUE, onCreateClue)
  ]);
}
