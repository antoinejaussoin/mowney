import React, { PropTypes, Component } from 'react';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import translate from 'i18n/Translate';
import { Card, CardTitle, CardText } from 'components/Card';
import Table from 'components/Table';
import { getFormattedTransactions } from './selectors';
import { loadTransactions } from './state';
import style from './index.scss';

const TransactionModel = {
  date: { type: Date },
  description: { type: String },
  debit: { type: Number },
  credit: { type: Number },
  balance: { type: Number },
  active: { type: Boolean }
};

class AccountDetails extends Component {
  componentDidMount() {
    console.log('Props: ', this.props);
    this.props.onLoad(this.props.params.accountId);
  }
  render() {
    const { transactions } = this.props;
    console.log('Transaxctions: ', transactions);
    return (
      <div className={style.container}>
        <Card>
          <CardTitle>
                        Account
          </CardTitle>
          <CardText>
            <Table
              model={TransactionModel}
              source={transactions}
            />
          </CardText>
        </Card>
      </div>
    );
  }
}

AccountDetails.propTypes = {
  transactions: PropTypes.array,
  params: PropTypes.object,
  onLoad: PropTypes.func
};

const mapStateToProps = (state) => ({
  transactions: getFormattedTransactions(state)
});

const mapActionsToProps = (dispatch) => ({
  onLoad: (accountId) => dispatch(loadTransactions(accountId))
});

const decorators = flow([
  translate('Accounts'),
  connect(mapStateToProps, mapActionsToProps)
]);

export default decorators(AccountDetails);
