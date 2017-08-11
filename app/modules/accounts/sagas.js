import { all } from 'redux-saga/effects';
import transactionsSagas from './transactions/sagas';

export default function* rootSaga() {
  yield all([
    transactionsSagas()
  ]);
}
