import { CREATE_CLUE_SUCCESS } from 'modules/categories/state';

export default (state, action) => {
  switch (action.type) {
  case CREATE_CLUE_SUCCESS:
    return action.payload;
  default:
    return state;
  }
};
