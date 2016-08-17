import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';
import dashboard from './dashboard';

const rootReducer = combineReducers({
    user,
    dashboard,
    routing: routerReducer
});

export default rootReducer;
