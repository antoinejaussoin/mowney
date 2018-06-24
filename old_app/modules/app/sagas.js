import { all, takeEvery, call, put } from 'redux-saga/effects';
// import { push } from 'react-router-redux';
import ls from 'local-storage';
import { loginSuccess } from 'modules/user/state';
import { loadDashboard } from 'modules/home/state';
import { loadEntities } from 'modules/entities/sagas';
import { reAuthenticate } from 'modules/user/api';
import { listOfCurrenciesModel,
  listOfAccountsModel,
  listOfLoadersModel,
  listOfCategoriesModel,
  listOfCluesModel } from 'models';
import { initialLoad, INITIALISE, INITIAL_LOAD, initialLoadSuccess } from './state';

function* doReAuthenticate() {
  const userAndToken = yield call(ls, 'token');
  if (userAndToken) {
    const validatedUserAndToken = yield call(reAuthenticate, userAndToken.token);
    if (validatedUserAndToken) {
      yield put(loginSuccess(validatedUserAndToken));
      yield put(initialLoad());
      // yield put(push('/'));
    }
  }
}

export function* onInitialise() {
  yield call(doReAuthenticate);
  yield put(initialLoadSuccess());
}

export function* onInitialLoad() {
  yield loadEntities('/loader/list', listOfLoadersModel);
  yield loadEntities('/currency/list', listOfCurrenciesModel);
  yield loadEntities('/account/list/all', listOfAccountsModel);
  yield loadEntities('/category/list', listOfCategoriesModel);
  yield loadEntities('/category/clues', listOfCluesModel);
  yield put(loadDashboard());
}

export default function* watchers() {
  yield all([
    takeEvery(INITIALISE, onInitialise),
    takeEvery(INITIAL_LOAD, onInitialLoad)
  ]);
}
