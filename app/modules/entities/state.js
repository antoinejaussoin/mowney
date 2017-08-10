import { createAction } from 'redux-actions';
import reduceReducers from 'reduce-reducers';
import accountReducer from './account-reducer';

export const ADD_ENTITIES = 'mowney/entities/add';

const entitiesReducer = reduceReducers(
  accountReducer
);

export default function reducer(state = {
  accounts: {},
  transactions: {},
  users: {}
}, action) {
  switch (action.type) {
  case ADD_ENTITIES:
    return {
      ...state,
      [action.payload.name]: {
        ...state[action.payload.name],
        ...action.payload.entities
      }
    };
  default:
    if (action && action.meta && action.meta.entity && action.meta.id) {
      return {
        ...state,
        [action.meta.entity]: {
          ...state[action.meta.entity],
          [action.meta.id]: entitiesReducer(state[action.meta.entity][action.meta.id], action)
        }
      };
    }
    return state;
  }
}

export const addEntities = createAction(ADD_ENTITIES, (name, entities) => ({ name, entities }));
