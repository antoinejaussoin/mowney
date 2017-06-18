import { createAction } from 'redux-actions';

export const LOAD_ACCOUNT_TRANSACTIONS = 'mowney/accounts/detail/load';
export const RECEIVE_ACCOUNT_TRANSACTIONS = 'mowney/accounts/detail/receive';

export default function reducer(state = {
    loading: false,
    transactions: []
}, action) {
    switch (action.type) {
    case LOAD_ACCOUNT_TRANSACTIONS:
        return {
            ...state,
            loading: true
        };
    case RECEIVE_ACCOUNT_TRANSACTIONS:
        return {
            ...state,
            loading: false,
            transactions: action.payload
        };
    default:
        return state;
    }
}

export const loadTransactions = createAction(LOAD_ACCOUNT_TRANSACTIONS);
export const receiveTransactions = createAction(RECEIVE_ACCOUNT_TRANSACTIONS);
