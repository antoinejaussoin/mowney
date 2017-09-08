import { all } from 'redux-saga/effects';
import listSagas from './list/sagas';
import createSagas from './create/sagas';
import actionsSagas from './actions/sagas';
import categoriseSagas from './categorise/sagas';

export default function* rootSaga() {
  yield all([
    listSagas(),
    createSagas(),
    actionsSagas(),
    categoriseSagas()
  ]);
}
