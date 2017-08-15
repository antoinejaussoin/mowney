import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table from 'components/Table';
import Input from 'components/Input';
import Button from 'components/Button';
import { Card, CardText, CardTitle } from 'components/Card';
import { getFormattedTransactions,
  getSearch,
  getGroupedByMonth,
  getGroupedByYear,
  getGroupedByAccount,
  getGroupedByCategory } from './selectors';
import { changeSearch, executeSearch } from './state';
import GroupedByMonth from './grouped-by-period';
import styles from './index.scss';

const TransactionModel = {
  date: { type: Date },
  description: { type: String },
  accountName: { type: String, title: 'Account' },
  categoryName: { type: String, title: 'Category' },
  debit: { type: Number },
  credit: { type: Number }
};

const Search = ({ transactions, search, onSearchChange, onExecuteSearch }) => (
  <div className={styles.container}>
    <Card>
      <CardText>
        <div className={styles.search}>
          <Input value={search} onChange={onSearchChange} />
          <Button label="Execute" onClick={onExecuteSearch} accent raised />
        </div>
      </CardText>
    </Card>
    <div className={styles.periods}>
      <Card>
        <CardText>
          <Card>
            <CardTitle>
              Per Month
            </CardTitle>
            <CardText>
              <GroupedByMonth selector={getGroupedByMonth} />
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              Per Year
            </CardTitle>
            <CardText>
              <GroupedByMonth selector={getGroupedByYear} />
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              Per Account
            </CardTitle>
            <CardText>
              <GroupedByMonth selector={getGroupedByAccount} />
            </CardText>
          </Card>
          <Card>
            <CardTitle>
              Per Category
            </CardTitle>
            <CardText>
              <GroupedByMonth selector={getGroupedByCategory} />
            </CardText>
          </Card>
        </CardText>
      </Card>
    </div>
    <Card>
      <CardTitle>
        Transactions
      </CardTitle>
      <CardText>
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
  transactions: getFormattedTransactions(state),
  search: getSearch(state)
});

const mapActionsToProps = (dispatch) => ({
  onSearchChange: (search) => dispatch(changeSearch(search)),
  onExecuteSearch: () => dispatch(executeSearch())
});

export default connect(mapStateToProps, mapActionsToProps)(Search);
