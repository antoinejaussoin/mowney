/* eslint func-names: "off" */

import appSagas from 'modules/app/sagas';
import accountsSagas from 'modules/accounts/sagas';
import homeSagas from 'modules/home/sagas';
import userSagas from 'modules/user/sagas';
import uploadSagas from 'modules/upload/sagas';

export default function* rootSaga() {
  yield [
    appSagas(),
    accountsSagas(),
    homeSagas(),
    userSagas(),
    uploadSagas()
  ];
}
