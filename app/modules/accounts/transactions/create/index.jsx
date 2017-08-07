import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import flow from 'lodash/flow';
import Input from 'components/Input';
import DatePicker from 'components/DatePicker';
import Button from 'components/Button';
import { changeAmount, changeTotal, changeDate, createTransaction } from './state';
import { selectAmount, selectTotal, selectDate } from './selectors';
import styles from './index.scss';

const CreateTransaction = ({ amount, total, date, onAmountChange, onTotalChange, onDateChange, onCreate }) => (
  <div className={styles.container}>
    <div className={styles.date}>
      <DatePicker label="Date" onChange={onDateChange} value={date} />
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
  onAmountChange: PropTypes.func,
  onTotalChange: PropTypes.func,
  onDateChange: PropTypes.func,
  onCreate: PropTypes.func
};

const mapStateToProps = (state) => ({
  amount: selectAmount(state),
  total: selectTotal(state),
  date: selectDate(state)
});

const mapDispatchToProps = dispatch => ({
  onAmountChange: (value) => dispatch(changeAmount(+value)),
  onTotalChange: (value) => dispatch(changeTotal(+value)),
  onDateChange: (value) => dispatch(changeDate(moment(value).toISOString())),
  onCreate: () => dispatch(createTransaction())
});

const decorators = flow([
  connect(mapStateToProps, mapDispatchToProps)
]);

export default decorators(CreateTransaction);
