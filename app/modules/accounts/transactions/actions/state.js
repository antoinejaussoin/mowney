import { createAction } from 'redux-actions';

export const DELETE_SELECTED_TRANSACTIONS = 'mowney/accounts/transactions/actions/delete-selected';
export const DELETE_SELECTED_TRANSACTIONS_SUCCESS = 'mowney/accounts/transactions/actions/delete-selected-success';
export const DELETE_SELECTED_TRANSACTIONS_FAILURE = 'mowney/accounts/transactions/actions/delete-selected-failure';

export const deleteSelectedTransactions = createAction(DELETE_SELECTED_TRANSACTIONS);
export const deleteSelectedTransactionsSuccess = createAction(DELETE_SELECTED_TRANSACTIONS_SUCCESS);
export const deleteSelectedTransactionsFailure = createAction(DELETE_SELECTED_TRANSACTIONS_FAILURE);
