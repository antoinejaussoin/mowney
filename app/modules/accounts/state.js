import { combineReducers } from 'redux';
import list from './list/state';
import detail from './detail/state';

const accountsReducer = combineReducers({
  list,
  detail
});

export default accountsReducer;
