import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { listOfAccountsModel, listOfTransactionsModel, listOfCategoriesModel, listOfCluesModel } from 'models';
import keys from 'lodash/keys';

const getRoot = state => state.entities;

const denorm = (model) => (ids, entities) => {
  const results = denormalize(ids, model, entities);
  // console.log('ids: ', ids);
  // console.log('model: ', model);
  // console.log('entities: ', entities);
  // console.log('Results: ', results);
  return results;
};

export const getEntities = getRoot;

export const getAccountEntities = createSelector(getRoot, entities => entities.accounts);
export const getAccountIds = createSelector(getRoot, entities => keys(entities.accounts));
export const getAccounts = createSelector(getAccountIds, getRoot, denorm(listOfAccountsModel));

export const getCategoryIds = createSelector(getRoot, entities => keys(entities.categories));
export const getCategories = createSelector(getCategoryIds, getRoot, denorm(listOfCategoriesModel));

export const getCluesIds = createSelector(getRoot, entities => keys(entities.clues));
export const getClues = createSelector(getCluesIds, getRoot, denorm(listOfCluesModel));

export const denormalizeTransactions = denorm(listOfTransactionsModel);
