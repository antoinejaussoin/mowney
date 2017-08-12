import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import find from 'lodash/find';
import { getAccounts } from 'modules/entities/selectors';
import { getAccountsRoot } from '../selectors';

export const getAccountsTransactionsRoot = createSelector(getAccountsRoot, accounts => accounts.transactions);
export const getAccount = createCachedSelector(getAccounts, (state, { accountId }) => accountId,
  (accounts, id) => find(accounts, { id: +id }))((state, { accountId }) => accountId);
