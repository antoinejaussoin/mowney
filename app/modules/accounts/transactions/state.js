import { combineReducers } from 'redux';
import list from './list/state';
import create from './create/state';

const accountsReducer = combineReducers({
  list,
  create
});

export default accountsReducer;
