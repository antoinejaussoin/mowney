import { createSelector } from 'reselect';
import { getCategoriesHierarchy } from '../../selectors';

export const selectOptions = createSelector(
  getCategoriesHierarchy, categories => categories.map(cat => ({
    value: cat.id,
    label: cat.name,
    level: cat.level
  }))
);
