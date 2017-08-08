import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import flow from 'lodash/flow';
import Table from 'components/Table';
import { getFormattedTransactions } from './selectors';

const TransactionModel = {
  date: { type: Date },
  description: { type: String },
  debit: { type: Number },
  credit: { type: Number },
  balance: { type: Number },
  active: { type: Boolean }
};

const TransactionList = ({ transactions }) => (
  <Table
    model={TransactionModel}
    source={transactions}
  />
);

TransactionList.propTypes = {
  transactions: PropTypes.array
};

const mapStateToProps = (state) => ({
  transactions: getFormattedTransactions(state)
});

const decorators = flow([
  connect(mapStateToProps)
]);

export default decorators(TransactionList);
