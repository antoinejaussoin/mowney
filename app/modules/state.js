import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from 'modules/user/state';
import dashboard from 'modules/home/state';
import accounts from 'modules/accounts/state';

const rootReducer = combineReducers({
    user,
    dashboard,
    accounts,
    routing: routerReducer
});

export default rootReducer;
