import { all, takeEvery, call, put, select } from 'redux-saga/effects';
import { getToken } from 'modules/user/selectors';
import { CREATE_CLUE, createClueSuccess } from './state';
import { getSelectedCategories } from './selectors';
import { postClue } from './api';

function* onCreateClue({ payload: { str, isRegex } }) {
  try {
    const token = yield select(getToken);
    const categories = yield select(getSelectedCategories);
    const newClue = yield call(postClue, token, categories[0], isRegex, str);
    yield put(createClueSuccess(newClue));
  } catch (e) {
    console.error('Get search error: ', e);
  }
}

export default function* watchers() {
  yield all([
    takeEvery(CREATE_CLUE, onCreateClue)
  ]);
}
