/* eslint func-names: "off" */

import appSagas from 'modules/app/sagas';
import homeSagas from 'modules/home/sagas';
import userSagas from 'modules/user/sagas';

export default function* rootSaga() {
    yield [
        appSagas(),
        homeSagas(),
        userSagas()
    ];
}
