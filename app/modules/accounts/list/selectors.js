import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { getAccountEntities } from 'modules/entities/selectors';
import { listOfAccountsModel } from '../model';
import { getAccountsRoot } from '../selectors';

export const getAccountsListRoot = createSelector(getAccountsRoot, accounts => accounts.list);
export const getAccountIds = createSelector(getAccountsListRoot, list => list.list);
export const getAccounts = createSelector(getAccountIds, getAccountEntities, (ids, accounts) =>
  denormalize(ids, listOfAccountsModel, { accounts }));
export const getActiveAccounts = createSelector(getAccounts, accounts => accounts.filter(account => account.isActive));
