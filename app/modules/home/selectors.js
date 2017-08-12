import { createSelector } from 'reselect';
import { round } from 'utils/math';

const getRoot = state => state.dashboard;

export const getSummary = createSelector(getRoot, root => root.summary);
export const getSavings = createSelector(getRoot, root => root.savings);
export const getSavingsPerYear = createSelector(getRoot,
  root => root.savingsPerYear.map(i => ({ date: i.date, amount: round(+i.amount, 2) })));
export const getTimeline = createSelector(getRoot, root => root.timeline);
export const getTotal = createSelector(getRoot, root => root.summary.total);
