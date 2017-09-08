import { createAction } from 'redux-actions';

export const OPEN_MODAL = 'mowney/accounts/transactions/categorise/open-modal';
export const CLOSE_MODAL = 'mowney/accounts/transactions/categorise/close-modal';
export const CHANGE_CATEGORY = 'mowney/accounts/transactions/categorise/change-category';
export const ASSIGN_CATEGORY = 'mowney/accounts/transactions/categorise/assign-category';
export const ASSIGN_CATEGORY_SUCCESS = 'mowney/accounts/transactions/categorise/assign-category-success';

const INITIAL_STATE = {
  open: false,
  category: null
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case OPEN_MODAL:
    return {
      ...state,
      open: true
    };
  case CLOSE_MODAL:
    return {
      ...state,
      open: false,
      category: null
    };
  case CHANGE_CATEGORY:
    return {
      ...state,
      category: action.payload
    };
  default:
    return state;
  }
}

export const openModal = createAction(OPEN_MODAL);
export const closeModal = createAction(CLOSE_MODAL);
export const changeCategory = createAction(CHANGE_CATEGORY);
export const assignCategory = createAction(ASSIGN_CATEGORY);
export const assignCategorySuccess = createAction(ASSIGN_CATEGORY_SUCCESS,
  (transactionId, categoryId) => categoryId, (transactionId) => ({ entity: 'transactions', id: transactionId }));
