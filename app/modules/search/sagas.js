import { all, takeEvery, call, put, select } from 'redux-saga/effects';
import { getToken } from 'modules/user/selectors';
import { EXECUTE_SEARCH, receiveSearchResults } from './state';
import { getSearch } from './selectors';
import { fetchSearch } from './api';

function* onSearch() {
  try {
    const token = yield select(getToken);
    const search = yield select(getSearch);
    const searchResults = yield call(fetchSearch, token, search, 'GBP', 500);
    yield put(receiveSearchResults(searchResults));
  } catch (e) {
    console.error('Get search error: ', e);
  }
}

export default function* watchers() {
  yield all([
    takeEvery(EXECUTE_SEARCH, onSearch)
  ]);
}
