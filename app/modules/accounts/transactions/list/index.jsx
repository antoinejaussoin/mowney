import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Table from 'components/Table';
import { updateSelected } from './state';
import { getFormattedTransactions, getSelectedTransactionsIndicies } from './selectors';

const TransactionModel = {
  date: { type: Date },
  description: { type: String },
  debit: { type: Number },
  credit: { type: Number },
  balance: { type: Number }
};

const TransactionList = ({ transactions, selected, onSelect }) => (
  <Table
    model={TransactionModel}
    source={transactions}
    selected={selected}
    onSelect={onSelect(transactions)}
    multiSelectable
    selectable
  />
);

TransactionList.propTypes = {
  transactions: PropTypes.array,
  selected: PropTypes.array,
  onSelect: PropTypes.func
};

const rowIndexToId = (transactions, indicies) => indicies.map(index => transactions[index].id);

const mapStateToProps = (state) => ({
  transactions: getFormattedTransactions(state),
  selected: getSelectedTransactionsIndicies(state)
});

const mapActionsToProps = (dispatch) => ({
  onSelect: (transactions) => (list) => dispatch(updateSelected(rowIndexToId(transactions, list)))
});

const decorators = compose(
  connect(mapStateToProps, mapActionsToProps)
);

export default decorators(TransactionList);
