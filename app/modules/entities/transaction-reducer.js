import { CREATE_TRANSACTION_SUCCESS } from 'modules/accounts/transactions/create/state';

export default (state, action) => {
  switch (action.type) {
  case CREATE_TRANSACTION_SUCCESS:
    return action.payload;
  default:
    return state;
  }
};
