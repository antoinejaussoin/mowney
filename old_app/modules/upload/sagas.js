import { all, takeEvery, call, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import entries from 'lodash/entries';
import { getToken } from 'modules/user/selectors';
import { loadDashboard } from 'modules/home/state';
import { uploadFile } from './api';
import { uploadAllSuccess, UPLOAD_ALL } from './state';
import { getFiles } from './selectors';

export function* onUploadAll() {
  try {
    const token = yield select(getToken);
    const files = yield select(getFiles);
    const fileEntries = entries(files);

    for (let i = 0; i < fileEntries.length; i++) {
      const accountId = fileEntries[i][0];
      const file = fileEntries[i][1];
      yield call(uploadFile, token, accountId, file);
    }

    yield put(loadDashboard());
    yield put(uploadAllSuccess());
    yield put(push('/'));
  } catch (e) {
    console.error('Get Accounts error: ', e);
  }
}

export default function* watchers() {
  yield all([
    takeEvery(UPLOAD_ALL, onUploadAll)
  ]);
}
