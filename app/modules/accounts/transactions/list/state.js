import { createAction } from 'redux-actions';

export const LOAD_ACCOUNT_TRANSACTIONS = 'mowney/accounts/transactions/list/load';
export const RECEIVE_ACCOUNT_TRANSACTIONS = 'mowney/accounts/transactions/list/receive';

export default function reducer(state = {
  loading: false,
  list: [],
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
  default:
    return state;
  }
}

export const loadTransactions = createAction(LOAD_ACCOUNT_TRANSACTIONS);
export const receiveTransactions = createAction(RECEIVE_ACCOUNT_TRANSACTIONS);
