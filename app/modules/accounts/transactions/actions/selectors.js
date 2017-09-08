import { createSelector } from 'reselect';
import { getSelectedTransactions } from '../list/selectors';
import { getAccount } from '../selectors';

export const selectAreTransactionsSelected = createSelector(getSelectedTransactions, selected => selected.length > 0);
export const selectIsActive = createSelector(getAccount, account => account ? account.isActive : false);
export const selectIsStatEnabled = createSelector(getAccount, account => account ? account.isStatEnabled : false);
