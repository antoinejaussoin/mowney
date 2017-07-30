import listSagas from './list/sagas';

export default function* rootSaga() {
  yield [
    listSagas()
  ];
}
