import { createAction } from 'redux-actions';
import { TOGGLE_IS_ACTIVE, TOGGLE_IS_STAT_ENABLED } from '../transactions/actions/state';

export const LOAD_ACCOUNTS = 'mowney/accounts/list/load';
export const RECEIVE_ACCOUNTS = 'mowney/accounts/list/receive';

const accountReducer = (state, action) => {
  switch (action.type) {
  case TOGGLE_IS_ACTIVE:
    return {
      ...state,
      isActive: !state.isActive
    };
  case TOGGLE_IS_STAT_ENABLED:
    return {
      ...state,
      isStatEnabled: !state.isStatEnabled
    };
  default:
    return state;
  }
};

export default function reducer(state = {
  loading: false,
  list: [],
  entities: {}
}, action) {
  switch (action.type) {
  case LOAD_ACCOUNTS:
    return {
      ...state,
      loading: true
    };
  case RECEIVE_ACCOUNTS:
    return {
      ...state,
      loading: false,
      ...action.payload
    };
  default:
    if (action && action.meta && action.meta.accountId) {
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.meta.accountId]: accountReducer(state.entities[action.meta.accountId], action)
        }
      };
    }
    return state;
  }
}

export const loadAccounts = createAction(LOAD_ACCOUNTS);
export const receiveAccounts = createAction(RECEIVE_ACCOUNTS);
