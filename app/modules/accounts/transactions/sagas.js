import { all } from 'redux-saga/effects';
import listSagas from './list/sagas';
import createSagas from './create/sagas';

export default function* rootSaga() {
  yield all([
    listSagas(),
    createSagas()
  ]);
}
