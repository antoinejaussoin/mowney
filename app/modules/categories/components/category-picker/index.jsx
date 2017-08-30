import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dropdown from 'components/Dropdown';
import { selectOptions } from './selectors';

const ItemTemplate = item => (
  <div>
    <span style={{ marginLeft: item.level * 20 }}>{item.label}</span>
  </div>
);

const CategoryPicker = ({ options, value, onChange }) => (
  <Dropdown
    source={options}
    value={value}
    onChange={onChange}
    template={ItemTemplate}
  />
);

CategoryPicker.propTypes = {
  options: PropTypes.array,
  value: PropTypes.number,
  onChange: PropTypes.func
};

const mapStateToProps = (state) => ({
  options: selectOptions(state)
});

export default connect(mapStateToProps)(CategoryPicker);
