import { schema } from 'normalizr';

export const accountModel = new schema.Entity('accounts', {
  // user
});

export const listOfAccountsModel = new schema.Array(accountModel);

export const transactionModel = new schema.Entity('transactions', {
  accountId: accountModel
});

export const listOfTransactionsModel = new schema.Array(transactionModel);

export default accountModel;
