import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm } from 'redux-form';
import { TextInput, SwitchInput } from 'components/form';
import Button from 'components/Button';
// import { updateSelectedClues } from './state';
// import { getFormattedClues, getSelectedCluesIndicies } from './selectors';


const NewClue = ({ handleSubmit }) => (
  <div>
    <form onSubmit={handleSubmit}>
      <Field name="str" component={TextInput} label="Clue Text" />
      <Field name="isRegex" component={SwitchInput} label="Regex?" />
      <Button type="submit" label="Create" />
    </form>
  </div>
);

NewClue.propTypes = {
  handleSubmit: PropTypes.func
};

// const mapStateToProps = (state) => ({
//   clues: getFormattedClues(state),
//   selected: getSelectedCluesIndicies(state)
// });

// const mapActionsToProps = (dispatch) => ({
//   onSelect: (clues) => (list) => dispatch(updateSelectedClues(clues, list))
// });

const decorators = compose(
  reduxForm({ form: 'newClue' })
  // connect(mapStateToProps, mapActionsToProps)
);

export default decorators(NewClue);
