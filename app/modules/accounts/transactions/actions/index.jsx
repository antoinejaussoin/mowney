import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Button from 'components/Button';
import { selectCanDeleteSelected } from './selectors';
import { deleteSelectedTransactions } from './state';
import { loadAllTransactions } from '../list/state';
import styles from './index.scss';

const Actions = ({ onDeleteSelected, onLoadAll, canDeleteSelected }) => (
  <div className={styles.container}>
    <Button label="Delete Selected" icon="delete" onClick={onDeleteSelected} disabled={!canDeleteSelected} raised accent />
    <Button label="Load Every Transactions" icon="cloud_download" onClick={onLoadAll} raised primary />
  </div>
);

Actions.propTypes = {
  canDeleteSelected: PropTypes.bool,
  onDeleteSelected: PropTypes.func,
  onLoadAll: PropTypes.func
};

const mapStateToProps = (state) => ({
  canDeleteSelected: selectCanDeleteSelected(state)
});

const mapActionsToProps = (dispatch, { accountId }) => ({
  onDeleteSelected: () => dispatch(deleteSelectedTransactions()),
  onLoadAll: () => dispatch(loadAllTransactions(accountId))
});

const decorators = compose(
  connect(mapStateToProps, mapActionsToProps)
);

export default decorators(Actions);
