import PropTypes from 'prop-types';
import React from 'react';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import { getSavings } from '../selectors';
import style from './Savings.scss';
import SavingItem from './SavingItem';

const stateToProps = state => ({
  savings: getSavings(state)
});

const Savings = ({ savings }) => (
  <div className={style.savings}>
    { savings.map(saving =>
      <SavingItem saving={saving} key={saving.id} />) }
  </div>
);

Savings.propTypes = {
  savings: PropTypes.array
};

const decorators = flow([
  connect(stateToProps)
]);

export default decorators(Savings);
