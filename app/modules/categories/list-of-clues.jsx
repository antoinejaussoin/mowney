import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Table from 'components/Table';
import { updateSelectedClues, createClue } from './state';
import { getFormattedClues, getSelectedCluesIndicies } from './selectors';
import NewClue from './new-clue';

const ClueModel = {
  match: { type: String }
};

const ClueList = ({ clues, selected, onSelect, onCreateClue }) => (
  <div>
    <Table
      model={ClueModel}
      source={clues}
      selected={selected}
      onSelect={onSelect(clues)}
      multiSelectable={false}
      selectable
    />
    <NewClue onSubmit={onCreateClue} />
  </div>
);

ClueList.propTypes = {
  clues: PropTypes.array,
  selected: PropTypes.array,
  onSelect: PropTypes.func,
  onCreateClue: PropTypes.func
};

const rowIndexToId = (clues, indicies) => indicies.map(index => clues[index].id);

const mapStateToProps = (state) => ({
  clues: getFormattedClues(state),
  selected: getSelectedCluesIndicies(state)
});

const mapActionsToProps = (dispatch) => ({
  onSelect: (clues) => (list) => dispatch(updateSelectedClues(rowIndexToId(clues, list))),
  onCreateClue: (values) => dispatch(createClue(values))
});

const decorators = compose(
  connect(mapStateToProps, mapActionsToProps)
);

export default decorators(ClueList);
