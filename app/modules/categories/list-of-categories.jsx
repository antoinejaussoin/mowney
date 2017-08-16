import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Table from 'components/Table';
import { updateSelectedCategories } from './state';
import { getCategories, getSelectedCategoriesIndicies } from './selectors';

const CategoryModel = {
  name: { type: String },
  description: { type: String },
  parentName: { type: String, title: 'Parent' }
};

const CategoryList = ({ categories, selected, onSelect }) => (
  <Table
    model={CategoryModel}
    source={categories}
    selected={selected}
    onSelect={onSelect(categories)}
    multiSelectable={false}
    selectable
  />
);

CategoryList.propTypes = {
  categories: PropTypes.array,
  selected: PropTypes.array,
  onSelect: PropTypes.func
};

const rowIndexToId = (categories, indicies) => indicies.map(index => categories[index].id);

const mapStateToProps = (state) => ({
  categories: getCategories(state),
  selected: getSelectedCategoriesIndicies(state)
});

const mapActionsToProps = (dispatch) => ({
  onSelect: (categories) => (list) => dispatch(updateSelectedCategories(rowIndexToId(categories, list)))
});

const decorators = compose(
  connect(mapStateToProps, mapActionsToProps)
);

export default decorators(CategoryList);
