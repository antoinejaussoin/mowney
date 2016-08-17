/* eslint func-names: "off" */

import { takeEvery } from 'redux-saga';
import { LOGIN, LOGOUT } from '../state/user';
import { onLogin, onLogout } from './user';
import { LOAD_DASHBOARD, GET_SUMMARY } from '../state/dashboard';
import { onLoadDashboard, onGetSummary } from './dashboard';


export default function* rootSaga() {
    yield [
        takeEvery(LOGIN, onLogin),
        takeEvery(LOGOUT, onLogout),
        takeEvery(GET_SUMMARY, onGetSummary),
        takeEvery(LOAD_DASHBOARD, onLoadDashboard)
    ];
}
