/* eslint func-names: "off" */

import listSagas from './list/sagas';
import transactionsSagas from './transactions/sagas';

export default function* rootSaga() {
  yield [
    listSagas(),
    transactionsSagas()
  ];
}
