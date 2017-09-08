import { CREATE_TRANSACTION_SUCCESS } from 'modules/accounts/transactions/create/state';
import { ASSIGN_CATEGORY_SUCCESS } from 'modules/accounts/transactions/categorise/state';

export default (state, action) => {
  switch (action.type) {
  case CREATE_TRANSACTION_SUCCESS:
    return action.payload;
  case ASSIGN_CATEGORY_SUCCESS:
    return {
      ...state,
      categoryId: action.payload
    };
  default:
    return state;
  }
};
