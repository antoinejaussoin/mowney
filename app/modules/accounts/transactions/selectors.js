import { createSelector } from 'reselect';
import { getAccountsRoot } from '../selectors';

export const getAccountsTransactionsRoot = createSelector(getAccountsRoot, accounts => accounts.transactions);
