import { createAction } from 'redux-actions';

export const INITIALISE = 'mowney/initialise';
export const INITIAL_LOAD = 'mowney/initial-load';
export const INITIALISE_SUCCESS = 'mowney/initialise-success';

const INITIAL_STATE = {
  initialised: false
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case INITIALISE:
    return {
      ...state,
      initialised: false
    };
  case INITIALISE_SUCCESS:
    return {
      ...state,
      initialised: true
    };
  default:
    return state;
  }
}

export const initialise = createAction(INITIALISE);
export const initialLoad = createAction(INITIAL_LOAD);
export const initialLoadSuccess = createAction(INITIALISE_SUCCESS);
