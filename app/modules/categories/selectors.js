import { createSelector } from 'reselect';
import { getCategories as getCategoriesBase, getCategoryIds } from 'modules/entities/selectors';

const getCategoryRoot = state => state.categories;
export const getCategories = createSelector(getCategoriesBase, cats => cats.map(c => ({
  ...c,
  parentName: c.parentId ? c.parentId.name : '(none)'
})));
export const getSelectedCategories = createSelector(getCategoryRoot, root => root.selected);
export const getSelectedCategoriesIndicies = createSelector(
  getSelectedCategories, getCategoryIds,
  (selected, ids) => {
    console.log('stuff: ', selected, ids);
    return selected.map(id => ids.indexOf(id));
  });
