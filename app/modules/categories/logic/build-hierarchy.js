import keyBy from 'lodash/keyBy';

export const buildHierarchy = categories => {
  const keyed = keyBy(categories, 'id');

  categories.forEach(category => {
    category.children = [];
  });

  categories.forEach(category => {
    if (category.parentId) {
      keyed[category.parentId.id].children.push(category);
    }
  });

  const hierarchy = categories.filter(c => !c.parentId);
  return hierarchy;
};

const searchThrough = (categories, result, level) => {
  categories.forEach(category => {
    category.level = level;
    result.push(category);
    searchThrough(category.children, result, level + 1);
  });
};

export const buildFlatHierarchy = categories => {
  const hierarchy = buildHierarchy(categories);
  const result = [];
  searchThrough(hierarchy, result, 0);
  return result;
};
