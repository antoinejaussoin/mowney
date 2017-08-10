import { all, takeEvery, call, put, select } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { getToken } from 'modules/user/selectors';
import { addEntities } from 'modules/entities/state';
import { fetchAccounts } from './api';
import { receiveAccounts, LOAD_ACCOUNTS } from './state';
import { listOfAccountsModel } from '../model';

export function* onLoadAccounts() {
  try {
    const token = yield select(getToken);
    const data = yield call(fetchAccounts, token);
    const { result, entities } = normalize(data, listOfAccountsModel);
    yield put(addEntities(entities));
    yield put(receiveAccounts(result));
  } catch (e) {
    console.error('Get Accounts error: ', e);
  }
}

export default function* watchers() {
  yield all([
    takeEvery(LOAD_ACCOUNTS, onLoadAccounts)
  ]);
}
