import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { listOfAccountsModel } from './model';

export const getAccountIds = state => state.accounts.list;
export const getAccountEntities = state => state.accounts.entities;
export const getAccounts = createSelector(getAccountIds, getAccountEntities, (ids, accounts) =>
    denormalize(ids, listOfAccountsModel, { accounts }));
