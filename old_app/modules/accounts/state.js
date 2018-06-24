import { combineReducers } from 'redux';
import transactions from './transactions/state';

const accountsReducer = combineReducers({
  transactions
});

export default accountsReducer;
