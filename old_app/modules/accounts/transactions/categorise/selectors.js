import { createSelector } from 'reselect';
import { getAccountsTransactionsRoot } from '../selectors';

export const selectCategoriseRoot = createSelector(getAccountsTransactionsRoot, account => account.categorise);
export const selectIsOpen = createSelector(selectCategoriseRoot, categorise => categorise.open);
export const selectCategory = createSelector(selectCategoriseRoot, categorise => categorise.category);
