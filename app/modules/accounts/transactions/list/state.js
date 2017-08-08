import { createAction } from 'redux-actions';
import { CREATE_TRANSACTION_SUCCESS } from '../create/state';

export const LOAD_ACCOUNT_TRANSACTIONS = 'mowney/accounts/transactions/list/load';
export const RECEIVE_ACCOUNT_TRANSACTIONS = 'mowney/accounts/transactions/list/receive';
export const UPDATE_SELECTED = 'mowney/accounts/transactions/list/update-selected';

export default function reducer(state = {
  loading: false,
  list: [],
  selected: [],
  entities: {}
}, action) {
  switch (action.type) {
  case LOAD_ACCOUNT_TRANSACTIONS:
    return {
      ...state,
      loading: true
    };
  case RECEIVE_ACCOUNT_TRANSACTIONS:
    return {
      ...state,
      loading: false,
      ...action.payload
    };
  case CREATE_TRANSACTION_SUCCESS:
    return {
      ...state,
      entities: {
        ...state.entities,
        [action.payload.id]: action.payload
      },
      list: [
        action.payload.id,
        ...state.list
      ]
    };
  case UPDATE_SELECTED:
    return {
      ...state,
      selected: action.payload
    };
  default:
    return state;
  }
}

export const loadTransactions = createAction(LOAD_ACCOUNT_TRANSACTIONS);
export const receiveTransactions = createAction(RECEIVE_ACCOUNT_TRANSACTIONS);
export const updateSelected = createAction(UPDATE_SELECTED);
