import { createAction } from 'redux-actions';
import merge from 'lodash/merge';
import reduceReducers from 'reduce-reducers';
import accountReducer from './account-reducer';
import transactionReducer from './transaction-reducer';
import clueReducer from './clue-reducer';

export const ADD_ENTITIES = 'mowney/entities/add';

const entitiesReducer = reduceReducers(
  accountReducer,
  transactionReducer,
  clueReducer
);

export default function reducer(state = {
  accounts: {},
  transactions: {},
  currencies: {},
  users: {},
  clues: {},
  categories: {}
}, action) {
  switch (action.type) {
  case ADD_ENTITIES:
    return merge({ ...state }, action.payload); // TODO: check mutability
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

export const addEntities = createAction(ADD_ENTITIES);
