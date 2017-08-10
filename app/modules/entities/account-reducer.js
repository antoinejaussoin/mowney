import { TOGGLE_IS_ACTIVE, TOGGLE_IS_STAT_ENABLED } from 'modules/accounts/transactions/actions/state';

export default (state, action) => {
  switch (action.type) {
  case TOGGLE_IS_ACTIVE:
    console.log('worked: ', state, action);
    return {
      ...state,
      isActive: !state.isActive
    };
  case TOGGLE_IS_STAT_ENABLED:
    return {
      ...state,
      isStatEnabled: !state.isStatEnabled
    };
  default:
    return state;
  }
};
