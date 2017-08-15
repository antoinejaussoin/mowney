/* eslint func-names: "off" */

import { all } from 'redux-saga/effects';
import appSagas from 'modules/app/sagas';
import accountsSagas from 'modules/accounts/sagas';
import homeSagas from 'modules/home/sagas';
import userSagas from 'modules/user/sagas';
import uploadSagas from 'modules/upload/sagas';
import searchSagas from 'modules/search/sagas';

export default function* rootSaga() {
  yield all([
    appSagas(),
    accountsSagas(),
    homeSagas(),
    userSagas(),
    uploadSagas(),
    searchSagas()
  ]);
}
