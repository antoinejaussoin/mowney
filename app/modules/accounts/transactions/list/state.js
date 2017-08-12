import { createAction } from 'redux-actions';
import without from 'lodash/without';
import { LOCATION_CHANGE } from 'react-router-redux';
import { CREATE_TRANSACTION_SUCCESS } from '../create/state';
import { DELETE_SELECTED_TRANSACTIONS_SUCCESS } from '../actions/state';

export const LOAD_ACCOUNT_TRANSACTIONS = 'mowney/accounts/transactions/list/load';
export const LOAD_ALL_ACCOUNT_TRANSACTIONS = 'mowney/accounts/transactions/list/load-all';
export const RECEIVE_ACCOUNT_TRANSACTIONS = 'mowney/accounts/transactions/list/receive';
export const UPDATE_SELECTED = 'mowney/accounts/transactions/list/update-selected';

export default function reducer(state = {
  loading: false,
  list: [],
  selected: []
}, action) {
  switch (action.type) {
  case LOAD_ACCOUNT_TRANSACTIONS:
  case LOAD_ALL_ACCOUNT_TRANSACTIONS:
    return {
      ...state,
      loading: true,
      selected: []
    };
  case RECEIVE_ACCOUNT_TRANSACTIONS:
    return {
      ...state,
      loading: false,
      list: action.payload
    };
  case CREATE_TRANSACTION_SUCCESS:
    return {
      ...state,
      list: [
        action.payload.id,
        ...state.list
      ],
      selected: []
    };
  case UPDATE_SELECTED:
    return {
      ...state,
      selected: action.payload
    };
  case DELETE_SELECTED_TRANSACTIONS_SUCCESS:
    return {
      ...state,
      list: without(state.list, ...action.payload),
      selected: []
    };
  case LOCATION_CHANGE:
    return {
      ...state,
      list: [],
      selected: [],
      loading: false
    };
  default:
    return state;
  }
}

export const loadTransactions = createAction(LOAD_ACCOUNT_TRANSACTIONS);
export const loadAllTransactions = createAction(LOAD_ALL_ACCOUNT_TRANSACTIONS);
export const receiveTransactions = createAction(RECEIVE_ACCOUNT_TRANSACTIONS);
export const updateSelected = createAction(UPDATE_SELECTED);
