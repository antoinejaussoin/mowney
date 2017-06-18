import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { getAccountsRoot } from '../selectors';
import { getAccountEntities } from '../list/selectors';
import { listOfTransactionsModel } from '../model';

export const getAccountsDetailRoot = createSelector(getAccountsRoot, accounts => accounts.detail);
export const getTransactionIds = createSelector(getAccountsDetailRoot, detail => detail.list);
export const getTransactionEntities = createSelector(getAccountsDetailRoot, detail => detail.entities);
export const getTransactions = createSelector(getTransactionIds, getTransactionEntities, getAccountEntities, (ids, transactions, accounts) =>
    denormalize(ids, listOfTransactionsModel, { transactions, accounts }));
