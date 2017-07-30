import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { listOfAccountsModel } from '../model';
import { getAccountsRoot } from '../selectors';

export const getAccountsListRoot = createSelector(getAccountsRoot, accounts => accounts.list);
export const getAccountIds = createSelector(getAccountsListRoot, list => list.list);
export const getAccountEntities = createSelector(getAccountsListRoot, list => list.entities);
export const getAccounts = createSelector(getAccountIds, getAccountEntities, (ids, accounts) =>
    denormalize(ids, listOfAccountsModel, { accounts }));
