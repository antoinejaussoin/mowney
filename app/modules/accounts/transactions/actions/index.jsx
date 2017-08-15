import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Button from 'components/Button';
import Switch from 'components/Switch';
import { selectCanDeleteSelected, selectIsActive, selectIsStatEnabled } from './selectors';
import { deleteSelectedTransactions, toggleIsActive, toggleIsStatEnabled, categoriseAll } from './state';
import { loadAllTransactions } from '../list/state';
import styles from './index.scss';

const Actions = ({
  isActive, isStatEnabled, canDeleteSelected,
  onDeleteSelected, onLoadAll, onIsActiveToggled, onIsStatEnabledToggled, onCategorise
}) => (
  <div className={styles.container}>
    <Button label="Delete Selected" icon="delete" onClick={onDeleteSelected} disabled={!canDeleteSelected} raised accent />
    <Button label="Load Every Transactions" icon="cloud_download" onClick={onLoadAll} raised primary />
    <Button label="Categorise" icon="assignment" onClick={onCategorise} raised primary />
    <div><Switch label="Activated" checked={isActive} onChange={onIsActiveToggled} /></div>
    <div><Switch label="Statistics Enabled" checked={isStatEnabled} onChange={onIsStatEnabledToggled} /></div>
  </div>
);

Actions.propTypes = {
  isActive: PropTypes.bool,
  isStatEnabled: PropTypes.bool,
  canDeleteSelected: PropTypes.bool,
  onDeleteSelected: PropTypes.func,
  onLoadAll: PropTypes.func,
  onIsActiveToggled: PropTypes.func,
  onIsStatEnabledToggled: PropTypes.func,
  onCategorise: PropTypes.func
};

const mapStateToProps = (state, { accountId }) => ({
  isActive: selectIsActive(state, { accountId }),
  isStatEnabled: selectIsStatEnabled(state, { accountId }),
  canDeleteSelected: selectCanDeleteSelected(state)
});

const mapActionsToProps = (dispatch, { accountId }) => ({
  onDeleteSelected: () => dispatch(deleteSelectedTransactions()),
  onLoadAll: () => dispatch(loadAllTransactions(accountId)),
  onIsActiveToggled: () => dispatch(toggleIsActive(accountId)),
  onIsStatEnabledToggled: () => dispatch(toggleIsStatEnabled(accountId)),
  onCategorise: () => dispatch(categoriseAll(accountId))
});

const decorators = compose(
  connect(mapStateToProps, mapActionsToProps)
);

export default decorators(Actions);
