/* eslint func-names: "off" */

import listSagas from './list/sagas';
import detailSagas from './detail/sagas';

export default function* rootSaga() {
    yield [
        listSagas(),
        detailSagas()
    ];
}
