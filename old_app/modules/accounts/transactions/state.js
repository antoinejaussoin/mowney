import { combineReducers } from 'redux';
import list from './list/state';
import create from './create/state';
import categorise from './categorise/state';

const accountsReducer = combineReducers({
  list,
  create,
  categorise
});

export default accountsReducer;
