import { createAction } from 'redux-actions';
import moment from 'moment';

export const CHANGE_AMOUNT = 'mowney/accounts/transactions/create/change-amount';
export const CHANGE_TOTAL = 'mowney/accounts/transactions/create/change-total';
export const CHANGE_DATE = 'mowney/accounts/transactions/create/change-date';
export const CREATE_TRANSACTION = 'mowney/accounts/transactions/create';

export default function reducer(state = {
  amount: 0,
  total: null,
  date: moment().toISOString()
}, action) {
  switch (action.type) {
  case CHANGE_AMOUNT:
    return {
      ...state,
      amount: action.payload,
      total: null
    };
  case CHANGE_TOTAL:
    return {
      ...state,
      total: action.payload,
      amount: null
    };
  case CHANGE_DATE:
    return {
      ...state,
      date: action.payload
    };
  default:
    return state;
  }
}

export const changeAmount = createAction(CHANGE_AMOUNT);
export const changeTotal = createAction(CHANGE_TOTAL);
export const changeDate = createAction(CHANGE_DATE);
export const createTransaction = createAction(CREATE_TRANSACTION);
