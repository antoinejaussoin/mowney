import { all, takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import ls from 'local-storage';
import { initialLoad } from 'modules/app/state';
import { login, logout } from './api';
import { loginSuccess, loginFailure, LOGIN, LOGOUT } from './state';

export function* onLogin(action) {
  console.log(action);
  try {
    const userAndToken = yield call(login, action.payload.username, action.payload.password);
    yield put(loginSuccess(userAndToken));
    yield call(ls, 'token', userAndToken);
    yield put(initialLoad());
    yield put(push('/'));
  } catch (e) {
    console.error('Auth error: ', e);
    yield put(loginFailure('Login or password incorrect'));
  }
}

export function* onLogout(action) {
  console.log(action);
  yield call(logout);
}


export default function* watchers() {
  yield all([
    takeEvery(LOGIN, onLogin),
    takeEvery(LOGOUT, onLogout)
  ]);
}
