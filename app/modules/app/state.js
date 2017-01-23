import { createAction } from 'redux-actions';

export const INITIALISE = 'mowney/initialise';
export const INITIAL_LOAD = 'mowney/initial-load';

export const initialise = createAction(INITIALISE);
export const initialLoad = createAction(INITIAL_LOAD);
