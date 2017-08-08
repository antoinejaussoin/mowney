import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Button from 'components/Button';
import { selectCanDeleteSelected } from './selectors';
import { deleteSelectedTransactions } from './state';

const Actions = ({ onDeleteSelected, canDeleteSelected }) => (
  <Button label="Delete Selected" onClick={onDeleteSelected} disabled={!canDeleteSelected} raised primary />
);

Actions.propTypes = {
  canDeleteSelected: PropTypes.bool,
  onDeleteSelected: PropTypes.func
};

const mapStateToProps = (state) => ({
  canDeleteSelected: selectCanDeleteSelected(state)
});

const mapActionsToProps = (dispatch) => ({
  onDeleteSelected: () => dispatch(deleteSelectedTransactions())
});

const decorators = compose(
  connect(mapStateToProps, mapActionsToProps)
);

export default decorators(Actions);
