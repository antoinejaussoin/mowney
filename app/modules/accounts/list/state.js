import { createAction } from 'redux-actions';

export const LOAD_ACCOUNTS = 'mowney/accounts/list/load';
export const RECEIVE_ACCOUNTS = 'mowney/accounts/list/receive';

export default function reducer(state = {
    loading: false,
    list: [],
    entities: {}
}, action) {
    switch (action.type) {
    case LOAD_ACCOUNTS:
        return {
            ...state,
            loading: true
        };
    case RECEIVE_ACCOUNTS:
        return {
            ...state,
            loading: false,
            ...action.payload
        };
    default:
        return state;
    }
}

export const loadAccounts = createAction(LOAD_ACCOUNTS);
export const receiveAccounts = createAction(RECEIVE_ACCOUNTS);
