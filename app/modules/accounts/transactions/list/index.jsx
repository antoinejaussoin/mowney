import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Table from 'components/Table';
import { updateSelected } from './state';
import { getFormattedTransactions, getSelectedTransactions } from './selectors';

const TransactionModel = {
  date: { type: Date },
  description: { type: String },
  debit: { type: Number },
  credit: { type: Number },
  balance: { type: Number },
  active: { type: Boolean }
};

const TransactionList = ({ transactions, selected, onSelect }) => (
  <Table
    model={TransactionModel}
    source={transactions}
    selected={selected}
    onSelect={onSelect}
    multiSelectable
    selectable
  />
);

TransactionList.propTypes = {
  transactions: PropTypes.array,
  selected: PropTypes.array,
  onSelect: PropTypes.func
};

const mapStateToProps = (state) => ({
  transactions: getFormattedTransactions(state),
  selected: getSelectedTransactions(state)
});

const mapActionsToProps = (dispatch) => ({
  onSelect: (list) => dispatch(updateSelected(list))
});

const decorators = compose(
  connect(mapStateToProps, mapActionsToProps)
);

export default decorators(TransactionList);
