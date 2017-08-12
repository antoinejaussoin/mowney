import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import entities from 'modules/entities/state';
import user from 'modules/user/state';
import accounts from 'modules/accounts/state';
import dashboard from 'modules/home/state';
import upload from 'modules/upload/state';
import search from 'modules/search/state';

const rootReducer = combineReducers({
  entities,
  accounts,
  user,
  dashboard,
  upload,
  search,
  routing: routerReducer
});

export default rootReducer;
