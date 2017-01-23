/* eslint func-names: "off" */

import { takeEvery } from 'redux-saga';
import { LOGIN, LOGOUT } from 'modules/user/state';
import { onLogin, onLogout } from 'modules/user/sagas';
import { LOAD_DASHBOARD, GET_SUMMARY } from 'modules/home/state';
import { onLoadDashboard, onGetSummary } from 'modules/home/sagas';
import { INITIALISE, INITIAL_LOAD } from 'modules/app/state';
import { onInitialise, onInitialLoad } from 'modules/app/sagas';


export default function* rootSaga() {
    yield [
        takeEvery(INITIALISE, onInitialise),
        takeEvery(INITIAL_LOAD, onInitialLoad),
        takeEvery(LOGIN, onLogin),
        takeEvery(LOGOUT, onLogout),
        takeEvery(GET_SUMMARY, onGetSummary),
        takeEvery(LOAD_DASHBOARD, onLoadDashboard)
    ];
}
