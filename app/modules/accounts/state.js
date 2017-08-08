import { combineReducers } from 'redux';
import list from './list/state';
import transactions from './transactions/state';

const accountsReducer = combineReducers({
  list,
  transactions
});

export default accountsReducer;
