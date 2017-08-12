import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table from 'components/Table';
import Input from 'components/Input';
import Button from 'components/Button';
import { Card, CardText } from 'components/Card';
import { getTransactions, getSearch } from './selectors';
import { changeSearch, executeSearch } from './state';
import styles from './index.scss';

const TransactionModel = {
  date: { type: Date },
  description: { type: String },
  amount: { type: Number },
  amountInCurrency: { type: Number }
};

const Search = ({ transactions, search, onSearchChange, onExecuteSearch }) => (
  <div className={styles.container}>
    <Card>
      <CardText>
        <div className={styles.search}>
          <Input value={search} onChange={onSearchChange} />
          <Button label="Execute" onClick={onExecuteSearch} accent raised />
        </div>
        <div className={styles.result}>
          <Table
            model={TransactionModel}
            source={transactions}
            selectable={false}
          />
        </div>
      </CardText>
    </Card>
  </div>
);

Search.propTypes = {
  transactions: PropTypes.array,
  search: PropTypes.string,
  onSearchChange: PropTypes.func,
  onExecuteSearch: PropTypes.func
};

const mapStateToProps = (state) => ({
  transactions: getTransactions(state),
  search: getSearch(state)
});

const mapActionsToProps = (dispatch) => ({
  onSearchChange: (search) => dispatch(changeSearch(search)),
  onExecuteSearch: () => dispatch(executeSearch())
});

export default connect(mapStateToProps, mapActionsToProps)(Search);
