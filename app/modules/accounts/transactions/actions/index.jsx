import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Button from 'components/Button';
import Switch from 'components/Switch';
import { selectAreTransactionsSelected, selectIsActive, selectIsStatEnabled } from './selectors';
import { deleteSelectedTransactions, toggleIsActive, toggleIsStatEnabled, categoriseAll } from './state';
import { loadAllTransactions } from '../list/state';
import { openModal } from '../categorise/state';
import styles from './index.scss';

const Actions = ({
  isActive, isStatEnabled, areTransactionsSelected,
  onDeleteSelected, onLoadAll, onIsActiveToggled, onIsStatEnabledToggled, onCategorise, onOpenModal
}) => (
  <div className={styles.container}>
    <Button label="Delete Selected" icon="delete" onClick={onDeleteSelected} disabled={!areTransactionsSelected} raised accent />
    <Button label="Load Every Transactions" icon="cloud_download" onClick={onLoadAll} raised primary />
    <Button label="Categorise" icon="assignment" onClick={onCategorise} raised primary />
    <Button label="C" icon="assignment" onClick={onOpenModal} disabled={!areTransactionsSelected} raised primary />
    <div><Switch label="Activated" checked={isActive} onChange={onIsActiveToggled} /></div>
    <div><Switch label="Statistics Enabled" checked={isStatEnabled} onChange={onIsStatEnabledToggled} /></div>
  </div>
);

Actions.propTypes = {
  isActive: PropTypes.bool,
  isStatEnabled: PropTypes.bool,
  areTransactionsSelected: PropTypes.bool,
  onDeleteSelected: PropTypes.func,
  onLoadAll: PropTypes.func,
  onIsActiveToggled: PropTypes.func,
  onIsStatEnabledToggled: PropTypes.func,
  onCategorise: PropTypes.func,
  onOpenModal: PropTypes.func
};

const mapStateToProps = (state, { accountId }) => ({
  isActive: selectIsActive(state, { accountId }),
  isStatEnabled: selectIsStatEnabled(state, { accountId }),
  areTransactionsSelected: selectAreTransactionsSelected(state)
});

const mapActionsToProps = (dispatch, { accountId }) => ({
  onDeleteSelected: () => dispatch(deleteSelectedTransactions()),
  onLoadAll: () => dispatch(loadAllTransactions(accountId)),
  onIsActiveToggled: () => dispatch(toggleIsActive(accountId)),
  onIsStatEnabledToggled: () => dispatch(toggleIsStatEnabled(accountId)),
  onCategorise: () => dispatch(categoriseAll(accountId)),
  onOpenModal: () => dispatch(openModal(accountId))
});

const decorators = compose(
  connect(mapStateToProps, mapActionsToProps)
);

export default decorators(Actions);
