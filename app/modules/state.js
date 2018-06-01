import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import app from 'modules/app/state';
import entities from 'modules/entities/state';
import user from 'modules/user/state';
import accounts from 'modules/accounts/state';
import dashboard from 'modules/home/state';
import upload from 'modules/upload/state';
import search from 'modules/search/state';
import categories from 'modules/categories/state';

const rootReducer = combineReducers({
  app,
  entities,
  accounts,
  user,
  dashboard,
  upload,
  search,
  categories,
  routing: routerReducer,
  form
});

export default rootReducer;
