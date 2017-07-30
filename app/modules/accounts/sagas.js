import { all } from 'redux-saga/effects';
import listSagas from './list/sagas';
import transactionsSagas from './transactions/sagas';

export default function* rootSaga() {
  yield all([
    listSagas(),
    transactionsSagas()
  ]);
}
