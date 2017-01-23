import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from 'modules/user/state';
import dashboard from 'modules/home/state';

const rootReducer = combineReducers({
    user,
    dashboard,
    routing: routerReducer
});

export default rootReducer;
