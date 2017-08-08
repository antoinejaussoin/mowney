import { all, takeEvery, call, put, select } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { getToken } from 'modules/user/selectors';
import { fetchAccounts } from './api';
import { receiveAccounts, LOAD_ACCOUNTS } from './state';
import { listOfAccountsModel } from '../model';

export function* onLoadAccounts() {
  try {
    const token = yield select(getToken);
    const data = yield call(fetchAccounts, token);
    const { result, entities: { accounts } } = normalize(data, listOfAccountsModel);
    yield put(receiveAccounts({ entities: accounts, list: result }));
  } catch (e) {
    console.error('Get Accounts error: ', e);
  }
}

export default function* watchers() {
  yield all([
    takeEvery(LOAD_ACCOUNTS, onLoadAccounts)
  ]);
}
