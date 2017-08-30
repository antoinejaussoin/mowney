import { createSelector } from 'reselect';
import { getCategories as getCategoriesBase, getClues as getCluesBase } from 'modules/entities/selectors';
import { buildFlatHierarchy } from './logic/build-hierarchy';

const getCategoryRoot = state => state.categories;
export const getCategories = createSelector(getCategoriesBase, cats => cats.map(c => ({
  ...c,
  parentName: c.parentId ? c.parentId.name : '(none)'
})));
export const getCategoriesHierarchy = createSelector(getCategories, buildFlatHierarchy);
export const getCategoriesHierarchyIds = createSelector(getCategoriesHierarchy, cats => cats.map(c => c.id));
export const getSelectedCategories = createSelector(getCategoryRoot, root => root.selectedCategories);
export const getSelectedCategoriesIndicies = createSelector(
  getSelectedCategories, getCategoriesHierarchyIds,
  (selected, ids) => selected.map(id => ids.indexOf(id)));

export const getClues = createSelector(getSelectedCategories, getCluesBase,
  (categoryIds, clues) => clues.filter(c => categoryIds.indexOf(c.categoryId.id) > -1));
const getDisplayedCluesIds = createSelector(getClues, clues => clues.map(c => c.id));

export const getSelectedClues = createSelector(getCategoryRoot, root => root.selectedClues);
export const getSelectedCluesIndicies = createSelector(
  getSelectedClues, getDisplayedCluesIds,
  (selected, ids) => selected.map(id => ids.indexOf(id)));

export const getFormattedClues = createSelector(getClues, clues => clues.map(c => ({ ...c, match: c.exactString || c.regex })));
export const canDisplayClues = createSelector(getSelectedCategories, cats => Boolean(cats.length));
