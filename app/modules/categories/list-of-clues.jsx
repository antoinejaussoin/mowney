import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Table from 'components/Table';
import { updateSelectedClues } from './state';
import { getFormattedClues, getSelectedCluesIndicies } from './selectors';

const ClueModel = {
  match: { type: String }
};

const ClueList = ({ clues, selected, onSelect }) => (
  <Table
    model={ClueModel}
    source={clues}
    selected={selected}
    onSelect={onSelect(clues)}
    multiSelectable={false}
    selectable
  />
);

ClueList.propTypes = {
  clues: PropTypes.array,
  selected: PropTypes.array,
  onSelect: PropTypes.func
};

const rowIndexToId = (clues, indicies) => indicies.map(index => clues[index].id);

const mapStateToProps = (state) => ({
  clues: getFormattedClues(state),
  selected: getSelectedCluesIndicies(state)
});

const mapActionsToProps = (dispatch) => ({
  onSelect: (clues) => (list) => dispatch(updateSelectedClues(rowIndexToId(clues, list)))
});

const decorators = compose(
  connect(mapStateToProps, mapActionsToProps)
);

export default decorators(ClueList);
