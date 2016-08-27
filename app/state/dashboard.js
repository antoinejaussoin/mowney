import { createAction } from 'redux-actions';

export const LOAD_DASHBOARD = 'mowney/dashboard/load';
export const GET_SUMMARY = 'mowney/dashboard/get-summary';
export const RECEIVE_SUMMARY = 'mowney/dashboard/receive-summary';
export const GET_SAVINGS = 'mowney/dashboard/get-savings';
export const RECEIVE_SAVINGS = 'mowney/dashboard/receive-savings';
export const GET_TIMELINE = 'mowney/dashboard/get-timeline';
export const RECEIVE_TIMELINE = 'mowney/dashboard/receive-timeline';

export default function reducer(state = {
    summary: { lines: [] },
    savings: [],
    timeline: []
}, action) {
    switch (action.type) {
    case RECEIVE_SUMMARY:
        return {
            ...state,
            summary: action.payload
        };
    case RECEIVE_SAVINGS:
        return {
            ...state,
            savings: action.payload
        };
    case RECEIVE_TIMELINE:
        return {
            ...state,
            timeline: action.payload
        };
    default:
        return state;
    }
}

export const loadDashboard = createAction(LOAD_DASHBOARD);
export const getSummary = createAction(GET_SUMMARY);
export const receiveSummary = createAction(RECEIVE_SUMMARY);
export const getSavings = createAction(GET_SAVINGS);
export const receiveSavings = createAction(RECEIVE_SAVINGS);
export const getTimeline = createAction(GET_TIMELINE);
export const receiveTimeline = createAction(RECEIVE_TIMELINE);
