import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import classNames from 'classnames';
import { Link } from 'react-router';
import { getAccounts } from 'modules/entities/selectors';
import styles from './index.scss';

const AccountList = ({ accounts }) => (
  <div className={styles.container}>
    { accounts.map(account => (
      <div key={account.id} className={classNames(styles.item, { [styles.active]: account.isActive })}>
        <Link to={`/accounts/${account.id}`}>{ account.name }</Link>
      </div>
    ))}
  </div>
);

AccountList.propTypes = {
  accounts: PropTypes.array
};

const mapStateToProps = (state) => ({
  accounts: getAccounts(state)
});

const decorators = compose(
  connect(mapStateToProps)
);

export default decorators(AccountList);
