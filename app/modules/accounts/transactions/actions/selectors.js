import { createSelector } from 'reselect';
import { getSelectedTransactions } from '../list/selectors';

export const selectCanDeleteSelected = createSelector(getSelectedTransactions, selected => selected.length > 0);
