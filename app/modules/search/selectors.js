import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import keyBy from 'lodash/keyBy';
import { listOfTransactionsModel } from 'models';
import { getEntities } from 'modules/entities/selectors';
import formatTransactions from './logic/format';
import { groupByMonth, groupByYear, groupByAccount, groupByCategory } from './logic/group';


export const getSearchRoot = state => state.search;
const getTransactionsRaw = createSelector(getSearchRoot, root => root.transactions);
const getTransactionsIds = createSelector(getTransactionsRaw, ts => ts.map(t => t.id));
const getTransactionsKeyed = createSelector(getTransactionsRaw, ts => keyBy(ts, t => t.id));
export const getTransactions = createSelector(getTransactionsIds, getTransactionsKeyed, getEntities,
  (ids, transactions, entities) => denormalize(ids, listOfTransactionsModel, { ...entities, transactions }));
export const getFormattedTransactions = createSelector(getTransactions, ts => ts.map(formatTransactions));
export const getSearch = createSelector(getSearchRoot, root => root.search);

export const getGroupedByMonth = createSelector(getFormattedTransactions, groupByMonth);
export const getGroupedByYear = createSelector(getFormattedTransactions, groupByYear);
export const getGroupedByAccount = createSelector(getFormattedTransactions, groupByAccount);
export const getGroupedByCategory = createSelector(getFormattedTransactions, groupByCategory);
