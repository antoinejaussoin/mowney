import { all, takeEvery, call, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import ls from 'local-storage';
import { normalize } from 'normalizr';
import { loginSuccess } from 'modules/user/state';
import { loadDashboard } from 'modules/home/state';
import { loadAccounts } from 'modules/accounts/list/state';
import { getToken } from 'modules/user/selectors';
import { addEntities } from 'modules/entities/state';
import { reAuthenticate } from 'modules/user/api';
import { listOfCurrenciesModel } from 'models';
import { fetchCurrencies } from './api';
import { initialLoad, INITIALISE, INITIAL_LOAD } from './state';

function* doReAuthenticate() {
  const userAndToken = yield call(ls, 'token');
  if (userAndToken) {
    const validatedUserAndToken = yield call(reAuthenticate, userAndToken.token);
    if (validatedUserAndToken) {
      yield put(loginSuccess(validatedUserAndToken));
      yield put(initialLoad());
      yield put(push('/'));
    }
  }
}

export function* onInitialise() {
  yield call(doReAuthenticate);
}

function* loadCurrencies() {
  try {
    const token = yield select(getToken);
    const currencies = yield call(fetchCurrencies, token);
    const { entities } = normalize(currencies, listOfCurrenciesModel);
    yield put(addEntities(entities));
  } catch (e) {
    console.error('Get Accounts error: ', e);
  }
}

export function* onInitialLoad() {
  yield loadCurrencies();
  yield put(loadAccounts());
  yield put(loadDashboard());
}

export default function* watchers() {
  yield all([
    takeEvery(INITIALISE, onInitialise),
    takeEvery(INITIAL_LOAD, onInitialLoad)
  ]);
}
