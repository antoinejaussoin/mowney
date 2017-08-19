import { createAction } from 'redux-actions';
import { LOCATION_CHANGE } from 'react-router-redux';

export const UPDATE_SELECTED_CATEGORIES = 'mowney/categories/update-selected-categories';
export const UPDATE_SELECTED_CLUES = 'mowney/categories/update-selected-clues';
export const CREATE_CLUE = 'mowney/categories/create-clue';
export const CREATE_CLUE_SUCCESS = 'mowney/categories/create-clue-success';

export default function reducer(state = {
  selectedCategories: [],
  selectedClues: []
}, action) {
  switch (action.type) {
  case UPDATE_SELECTED_CATEGORIES:
    return {
      ...state,
      selectedCategories: action.payload,
      selectedClues: []
    };
  case UPDATE_SELECTED_CLUES:
    return {
      ...state,
      selectedClues: action.payload
    };
  case LOCATION_CHANGE:
    return {
      ...state,
      selectedCategories: [],
      selectedClues: []
    };
  default:
    return state;
  }
}

export const updateSelectedCategories = createAction(UPDATE_SELECTED_CATEGORIES);
export const updateSelectedClues = createAction(UPDATE_SELECTED_CLUES);
export const createClue = createAction(CREATE_CLUE);
export const createClueSuccess = createAction(
  CREATE_CLUE_SUCCESS,
  clue => clue,
  clue => ({ entity: 'clues', id: clue.id }));

