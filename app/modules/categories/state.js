import { createAction } from 'redux-actions';
import { LOCATION_CHANGE } from 'react-router-redux';

export const UPDATE_SELECTED = 'mowney/categories/update-selected';

export default function reducer(state = {
  selected: []
}, action) {
  switch (action.type) {
  case UPDATE_SELECTED:
    return {
      ...state,
      selected: action.payload
    };
  case LOCATION_CHANGE:
    return {
      ...state,
      selected: []
    };
  default:
    return state;
  }
}

export const updateSelected = createAction(UPDATE_SELECTED);
