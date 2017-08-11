/* eslint func-names: "off" */

import { all } from 'redux-saga/effects';
import appSagas from 'modules/app/sagas';
import homeSagas from 'modules/home/sagas';
import userSagas from 'modules/user/sagas';
import uploadSagas from 'modules/upload/sagas';

export default function* rootSaga() {
  yield all([
    appSagas(),
    homeSagas(),
    userSagas(),
    uploadSagas()
  ]);
}
