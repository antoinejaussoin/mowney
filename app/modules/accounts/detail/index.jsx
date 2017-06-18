import React, { PropTypes, Component } from 'react';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import translate from 'i18n/Translate';
import { Card, CardTitle, CardText } from 'components/Card';
import { getTransactions } from './selectors';
import { loadTransactions } from './state';
import style from './index.scss';

class AccountDetails extends Component {

    componentDidMount() {
        console.log('Props: ', this.props);
        this.props.onLoad(this.props.params.accountId);
    }
    render() {
        const { transactions } = this.props;
        return (
            <div className={style.container}>
                <Card>
                    <CardTitle>
                        Account
                    </CardTitle>
                    <CardText>
                        { transactions.length }
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
    transactions: getTransactions(state)
});

const mapActionsToProps = (dispatch) => ({
    onLoad: (accountId) => dispatch(loadTransactions(accountId))
});

const decorators = flow([
    translate('Accounts'),
    connect(mapStateToProps, mapActionsToProps)
]);

export default decorators(AccountDetails);
