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

const getIds = (entities) => keys(entities).map(id => +id);

export const getEntities = getRoot;

export const getAccountEntities = createSelector(getRoot, entities => entities.accounts);
export const getAccountIds = createSelector(getRoot, entities => getIds(entities.accounts));
export const getAccounts = createSelector(getAccountIds, getRoot, denorm(listOfAccountsModel));

export const getCategoryIds = createSelector(getRoot, entities => getIds(entities.categories));
export const getCategories = createSelector(getCategoryIds, getRoot, denorm(listOfCategoriesModel));

export const getClueIds = createSelector(getRoot, entities => getIds(entities.clues));
export const getClues = createSelector(getClueIds, getRoot, denorm(listOfCluesModel));

export const denormalizeTransactions = denorm(listOfTransactionsModel);
