import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import flow from 'lodash/flow';
import Input from 'components/Input';
import DatePicker from 'components/DatePicker';
import Button from 'components/Button';
import { changeAmount, changeTotal, changeDate, changeDescription, createTransaction } from './state';
import { selectAmount, selectTotal, selectDate, selectDescription } from './selectors';
import styles from './index.scss';

const CreateTransaction = ({ amount, total, date, description, onAmountChange, onTotalChange, onDateChange, onDescriptionChange, onCreate }) => (
  <div className={styles.container}>
    <div className={styles.date}>
      <DatePicker label="Date" onChange={onDateChange} value={date} />
    </div>
    <div className={styles.description}>
      <Input type="text" label="Description" onChange={onDescriptionChange} value={description} />
    </div>
    <div className={styles.amount}>
      <Input type="number" label="Amount" onChange={onAmountChange} value={amount} />
    </div>
    <div className={styles.total}>
      <Input type="number" label="Total" onChange={onTotalChange} value={total} />
    </div>
    <div className={styles.action}>
      <Button label="Create" onClick={onCreate} primary raised />
    </div>
  </div>
);

CreateTransaction.propTypes = {
  amount: PropTypes.number,
  total: PropTypes.number,
  date: PropTypes.any,
  description: PropTypes.string,
  onAmountChange: PropTypes.func,
  onTotalChange: PropTypes.func,
  onDateChange: PropTypes.func,
  onDescriptionChange: PropTypes.func,
  onCreate: PropTypes.func
};

const mapStateToProps = (state) => ({
  amount: selectAmount(state),
  total: selectTotal(state),
  date: selectDate(state),
  description: selectDescription(state)
});

const mapDispatchToProps = (dispatch, { accountId }) => ({
  onAmountChange: (value) => dispatch(changeAmount(value.length ? +value : '')),
  onTotalChange: (value) => dispatch(changeTotal(value.length ? +value : '')),
  onDescriptionChange: (value) => dispatch(changeDescription(value)),
  onDateChange: (value) => dispatch(changeDate(moment(value).toISOString())),
  onCreate: () => dispatch(createTransaction(accountId))
});

const decorators = flow([
  connect(mapStateToProps, mapDispatchToProps)
]);

export default decorators(CreateTransaction);
