import { createAction } from 'redux-actions';

export const EXECUTE_SEARCH = 'mowney/search/execute';
export const RECEIVE_SEARCH_RESULTS = 'mowney/search/receive';
export const SEARCH_CHANGE = 'mowney/search/change';

export default function reducer(state = {
  loading: false,
  transactions: [],
  search: 't.description like \'%deliveroo%\''
}, action) {
  switch (action.type) {
  case EXECUTE_SEARCH:
    return {
      ...state,
      loading: true,
      transactions: []
    };
  case RECEIVE_SEARCH_RESULTS:
    return {
      ...state,
      loading: false,
      transactions: action.payload
    };
  case SEARCH_CHANGE:
    return {
      ...state,
      search: action.payload
    };
  default:
    return state;
  }
}

export const executeSearch = createAction(EXECUTE_SEARCH);
export const receiveSearchResults = createAction(RECEIVE_SEARCH_RESULTS);
export const changeSearch = createAction(SEARCH_CHANGE);
