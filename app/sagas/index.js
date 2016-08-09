/* eslint func-names: "off" */

import { takeEvery } from 'redux-saga';
import { LOGIN, LOGOUT } from '../state/user';
import { onLogin, onLogout } from './user';

export default function* rootSaga() {
    yield [
        takeEvery(LOGIN, onLogin),
        takeEvery(LOGOUT, onLogout)
    ];
}
