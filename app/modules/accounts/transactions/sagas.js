import { all } from 'redux-saga/effects';
import listSagas from './list/sagas';

export default function* rootSaga() {
  yield all([
    listSagas()
  ]);
}
