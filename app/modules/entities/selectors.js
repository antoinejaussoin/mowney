import { createSelector } from 'reselect';

const getRoot = state => state.entities;

export const getAccountEntities = createSelector(getRoot, entities => entities.accounts);
