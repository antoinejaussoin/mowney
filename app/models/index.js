import { schema } from 'normalizr';

export const user = new schema.Entity('users');
export const summary = new schema.Entity('summaries');

export const loaderModel = new schema.Entity('loaders', {}, { idAttribute: 'type' });
export const listOfLoadersModel = new schema.Array(loaderModel);

export const currencyModel = new schema.Entity('currencies');
export const listOfCurrenciesModel = new schema.Array(currencyModel);

export const accountModel = new schema.Entity('accounts', {
  currencyId: currencyModel,
  loaderType: loaderModel
});
export const listOfAccountsModel = new schema.Array(accountModel);

export const categoryModel = new schema.Entity('categories', {});
categoryModel.define({
  parentId: categoryModel
});
export const listOfCategoriesModel = new schema.Array(categoryModel);

export const clueModel = new schema.Entity('clues', {
  categoryId: categoryModel,
  restrictToAccountId: accountModel
});
export const listOfCluesModel = new schema.Array(clueModel);

export const transactionModel = new schema.Entity('transactions', {
  accountId: accountModel,
  categoryId: categoryModel
});
export const listOfTransactionsModel = new schema.Array(transactionModel);
