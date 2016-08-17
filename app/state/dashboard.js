import { createAction } from 'redux-actions';

export const LOAD_DASHBOARD = 'mowney/dashboard/load';
export const GET_SUMMARY = 'mowney/dashboard/get-summary';
export const RECEIVE_SUMMARY = 'mowney/dashboard/receive-summary';

export default function reducer(state = {
    summary: { lines: [] }
}, action) {
    switch (action.type) {
    case RECEIVE_SUMMARY:
        return {
            ...state,
            summary: action.payload
        };
    default:
        return state;
    }
}

export const loadDashboard = createAction(LOAD_DASHBOARD);
export const getSummary = createAction(GET_SUMMARY);
export const receiveSummary = createAction(RECEIVE_SUMMARY);
