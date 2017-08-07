import { all, takeEvery, call, put, select } from 'redux-saga/effects';
import { getToken } from 'modules/user/selectors';
import { createTransactionSuccess, createTransactionFailure, CREATE_TRANSACTION } from './state';
import { selectAmount, selectDate, selectDescription } from './selectors';
import { postTransaction } from '../api';

export function* onCreateTransaction({ payload: accountId }) {
  try {
    const token = yield select(getToken);
    const amount = yield select(selectAmount);
    const date = yield select(selectDate);
    const description = yield select(selectDescription);
    if (token) {
      yield call(postTransaction, token, accountId, date, amount, description);
      yield put(createTransactionSuccess());
    }
  } catch (e) {
    console.error('Get Transactions error: ', e);
    yield put(createTransactionFailure(e.message));
  }
}

export default function* watchers() {
  yield all([
    takeEvery(CREATE_TRANSACTION, onCreateTransaction)
  ]);
}
