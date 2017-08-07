import { createSelector } from 'reselect';
import moment from 'moment';
import { round } from 'utils/math';
import { getAccountsTransactionsRoot } from '../selectors';
import { getFormattedTransactions } from '../list/selectors';

export const selectAccountsTransactionsCreateRoot = createSelector(getAccountsTransactionsRoot, accounts => accounts.create);
const selectAmountRaw = createSelector(selectAccountsTransactionsCreateRoot, detail => detail.amount);
const selectTotalRaw = createSelector(selectAccountsTransactionsCreateRoot, detail => detail.total);
export const selectLastBalance = createSelector(getFormattedTransactions, transactions => transactions.length ? +transactions[0].balance : 0);
export const selectAmount = createSelector(
  selectAmountRaw, selectTotalRaw, selectLastBalance,
  (amount, total, balance) => amount === null && total !== null ? round(total - balance) : amount
);
export const selectTotal = createSelector(
  selectAmountRaw, selectTotalRaw, selectLastBalance,
  (amount, total, balance) => amount !== null && total === null ? round(amount + balance) : total
);
export const selectDate = createSelector(selectAccountsTransactionsCreateRoot, detail => moment(detail.date).toDate());
export const selectDescription = createSelector(selectAccountsTransactionsCreateRoot, detail => detail.description);
