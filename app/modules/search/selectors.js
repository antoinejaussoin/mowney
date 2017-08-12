import { createSelector } from 'reselect';

export const getSearchRoot = state => state.search;
export const getTransactions = createSelector(getSearchRoot, root => root.transactions);
export const getSearch = createSelector(getSearchRoot, root => root.search);
