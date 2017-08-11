import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import entities from 'modules/entities/state';
import user from 'modules/user/state';
import dashboard from 'modules/home/state';
import upload from 'modules/upload/state';

const rootReducer = combineReducers({
  entities,
  user,
  dashboard,
  upload,
  routing: routerReducer
});

export default rootReducer;
