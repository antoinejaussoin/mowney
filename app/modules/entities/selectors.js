import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { listOfAccountsModel } from 'models';
import keys from 'lodash/keys';

const getRoot = state => state.entities;

const denorm = (model) => (ids, entities) => {
  const results = denormalize(ids, model, entities);
  console.log('Results: ', results);
  return results;
};

export const getAccountEntities = createSelector(getRoot, entities => entities.accounts);
export const getAccountIds = createSelector(getRoot, entities => keys(entities.accounts));
export const getAccounts = createSelector(getAccountIds, getRoot, denorm(listOfAccountsModel));
