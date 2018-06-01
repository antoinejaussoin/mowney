import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { TextInput, SwitchInput } from 'components/form';
import Button from 'components/Button';

const selector = formValueSelector('newClue');

const NewClue = ({ handleSubmit, canCreate = true, clueText }) => (
  <div>
    <form onSubmit={handleSubmit}>
      <Field name="str" component={TextInput} label="Clue Text" />
      <Field name="isRegex" component={SwitchInput} label="Regex?" />
      <Button type="submit" label="Create" primary raised disabled={!canCreate || !clueText} />
    </form>
  </div>
);

NewClue.propTypes = {
  handleSubmit: PropTypes.func,
  canCreate: PropTypes.bool,
  clueText: PropTypes.string
};

const decorators = compose(
  reduxForm({ form: 'newClue' }),
  connect(state => ({
    clueText: selector(state, 'str')
  }))
);

export default decorators(NewClue);
