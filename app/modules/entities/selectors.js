import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { listOfAccountsModel } from 'models';
import keys from 'lodash/keys';

const getRoot = state => state.entities;

const denorm = (model) => (ids, entities) => denormalize(ids, model, entities);

export const getAccountEntities = createSelector(getRoot, entities => entities.accounts);
export const getAccountIds = createSelector(getRoot, entities => keys(entities.accounts));
export const getAccounts = createSelector(getAccountIds, getRoot, denorm(listOfAccountsModel));
