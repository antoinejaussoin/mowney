import PropTypes from 'prop-types';
import React, { Component } from 'react';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import translate from 'i18n/Translate';
import { Card, CardTitle, CardText } from 'components/Card';
import { loadTransactions } from './list/state';
import List from './list';
import Create from './create';
import style from './index.scss';

class AccountDetails extends Component {
  componentDidMount() {
    this.props.onLoad(this.props.params.accountId);
  }
  render() {
    const { accountId } = this.props.params;
    return (
      <div className={style.container}>
        <Card>
          <CardTitle>
            Create Transaction
          </CardTitle>
          <CardText>
            <Create accountId={accountId} />
          </CardText>
        </Card>
        <Card>
          <CardTitle>
            Account
          </CardTitle>
          <CardText>
            <List />
          </CardText>
        </Card>
      </div>
    );
  }
}

AccountDetails.propTypes = {
  params: PropTypes.object,
  onLoad: PropTypes.func
};

const mapActionsToProps = (dispatch) => ({
  onLoad: (accountId) => dispatch(loadTransactions(accountId))
});

const decorators = flow([
  translate('Accounts'),
  connect(null, mapActionsToProps)
]);

export default decorators(AccountDetails);
