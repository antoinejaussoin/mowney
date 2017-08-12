import { call, put, select } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { getToken } from 'modules/user/selectors';
import { addEntities } from 'modules/entities/state';
import { fetchEntities } from './api';

export function* loadEntities(url, model) {
  try {
    const token = yield select(getToken);
    const entitiesWrapper = yield call(fetchEntities, token, url);
    const { result, entities } = normalize(entitiesWrapper, model);
    yield put(addEntities(entities));
    return result;
  } catch (e) {
    console.error('Get entities error: ', e);
    return undefined;
  }
}
