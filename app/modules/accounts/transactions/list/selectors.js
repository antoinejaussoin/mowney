import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { getAccountEntities } from 'modules/entities/selectors';
import { getAccountsTransactionsRoot } from '../selectors';
import { listOfTransactionsModel } from '../../model';
import formatTransaction from './logic/format-transaction';

export const getAccountsTransactionsListRoot = createSelector(getAccountsTransactionsRoot, accounts => accounts.list);
export const getTransactionIds = createSelector(getAccountsTransactionsListRoot, detail => detail.list);
export const getTransactionEntities = createSelector(getAccountsTransactionsListRoot, detail => detail.entities);
export const getTransactions = createSelector(getTransactionIds, getTransactionEntities, getAccountEntities, (ids, transactions, accounts) =>
  denormalize(ids, listOfTransactionsModel, { transactions, accounts }));
export const getFormattedTransactions = createSelector(getTransactions, transactions => transactions.map(formatTransaction));
export const getSelectedTransactions = createSelector(getAccountsTransactionsListRoot, detail => detail.selected);
export const getSelectedTransactionsIndicies = createSelector(
  getSelectedTransactions, getTransactionIds,
  (selected, ids) => selected.map(id => ids.indexOf(id)));
