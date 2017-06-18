import { createSelector } from 'reselect';
import { getAccountsRoot } from '../selectors';

export const getAccountsDetailRoot = createSelector(getAccountsRoot, accounts => accounts.detail);
export const getTransactions = createSelector(getAccountsDetailRoot, detail => detail.transactions);
