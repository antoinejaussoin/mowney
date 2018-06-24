import { createSelector } from 'reselect';
import { getAccounts } from 'modules/entities/selectors';

export const getActiveAccounts = createSelector(getAccounts, accounts => accounts.filter(account => account.isActive));
