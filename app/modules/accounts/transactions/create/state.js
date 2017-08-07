import { createAction } from 'redux-actions';
import moment from 'moment';

export const CHANGE_AMOUNT = 'mowney/accounts/transactions/create/change-amount';
export const CHANGE_TOTAL = 'mowney/accounts/transactions/create/change-total';
export const CHANGE_DATE = 'mowney/accounts/transactions/create/change-date';
export const CHANGE_DESCRIPTION = 'mowney/accounts/transactions/create/change-description';
export const CREATE_TRANSACTION = 'mowney/accounts/transactions/create';
export const CREATE_TRANSACTION_SUCCESS = 'mowney/accounts/transactions/create-success';
export const CREATE_TRANSACTION_FAILURE = 'mowney/accounts/transactions/create-failure';

const INITIAL_STATE = {
  amount: 0,
  total: null,
  date: moment().toISOString()
};

export default function reducer(state = INITIAL_STATE, action) {
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
  case CHANGE_DESCRIPTION:
    return {
      ...state,
      description: action.payload
    };
  case CREATE_TRANSACTION_SUCCESS:
    return {
      ...INITIAL_STATE
    };
  default:
    return state;
  }
}

export const changeAmount = createAction(CHANGE_AMOUNT);
export const changeTotal = createAction(CHANGE_TOTAL);
export const changeDate = createAction(CHANGE_DATE);
export const changeDescription = createAction(CHANGE_DESCRIPTION);
export const createTransaction = createAction(CREATE_TRANSACTION);
export const createTransactionSuccess = createAction(CREATE_TRANSACTION_SUCCESS);
export const createTransactionFailure = createAction(CREATE_TRANSACTION_FAILURE);
