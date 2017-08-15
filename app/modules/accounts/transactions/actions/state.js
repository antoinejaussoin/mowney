import { createAction } from 'redux-actions';

export const DELETE_SELECTED_TRANSACTIONS = 'mowney/accounts/transactions/actions/delete-selected';
export const DELETE_SELECTED_TRANSACTIONS_SUCCESS = 'mowney/accounts/transactions/actions/delete-selected-success';
export const DELETE_SELECTED_TRANSACTIONS_FAILURE = 'mowney/accounts/transactions/actions/delete-selected-failure';
export const TOGGLE_IS_ACTIVE = 'mowney/accounts/transactions/actions/toggle-is-active';
export const TOGGLE_IS_STAT_ENABLED = 'mowney/accounts/transactions/actions/toggle-is-stat-enabled';
export const CATEGORISE_ALL = 'mowney/accounts/transactions/actions/categorise-all';
export const CATEGORISE_ALL_SUCCESS = 'mowney/accounts/transactions/actions/categorise-all-success';

export const deleteSelectedTransactions = createAction(DELETE_SELECTED_TRANSACTIONS);
export const deleteSelectedTransactionsSuccess = createAction(DELETE_SELECTED_TRANSACTIONS_SUCCESS);
export const deleteSelectedTransactionsFailure = createAction(DELETE_SELECTED_TRANSACTIONS_FAILURE);
export const toggleIsActive = createAction(TOGGLE_IS_ACTIVE, null, id => ({ entity: 'accounts', id }));
export const toggleIsStatEnabled = createAction(TOGGLE_IS_STAT_ENABLED, null, id => ({ entity: 'accounts', id }));
export const categoriseAll = createAction(CATEGORISE_ALL);
export const categoriseAllSuccess = createAction(CATEGORISE_ALL_SUCCESS);
