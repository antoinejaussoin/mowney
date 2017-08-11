import { schema } from 'normalizr';

export const user = new schema.Entity('users');

export const summary = new schema.Entity('summaries');

export const currencyModel = new schema.Entity('currencies');
export const listOfCurrenciesModel = new schema.Array(currencyModel);

export const accountModel = new schema.Entity('accounts', {
  currencyId: currencyModel
});

export const listOfAccountsModel = new schema.Array(accountModel);

export const transactionModel = new schema.Entity('transactions', {
  accountId: accountModel
});

export const listOfTransactionsModel = new schema.Array(transactionModel);

