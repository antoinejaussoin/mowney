import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAccount } from '../selectors';
import styles from './index.scss';

const AccountInfo = ({ account }) => (
  <div className={styles.container}>
    <h4>{account.name}</h4>
    <p>{account.currencyId.name}</p>
  </div>
);

AccountInfo.propTypes = {
  account: PropTypes.object
};

const mapStateToProps = (state, { accountId }) => ({
  account: getAccount(state, { accountId })
});

export default connect(mapStateToProps)(AccountInfo);
