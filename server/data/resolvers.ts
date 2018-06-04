import { Account, Currency, Transaction } from './connectors';
import savingsPerYear from './queries/savings-per-year';
import { FindOptions } from 'sequelize';
// import Currency from './models/currency';

const resolvers = {
  Query: {
    accountById(root, args) {
      return Promise.resolve<any>(Account.findById(args.id));
    },
    allAccounts(root, args) {
      return Promise.resolve<any>(Account.findAll);
    },
    savingsPerYear(root, args) {
      return savingsPerYear({ id: 200 }, args.currency);
    }
  },
  Account: {
    currency(account) {
      return Promise.resolve<any>(Currency.findById(account.currencyId));
    },
    transactions(account) {
      return Promise.resolve<any>(Transaction.findAll({
        where: {
          accountId: account.id
        }
      }));
    }
  }
  // Author: {
  //   posts(author) {
  //     return [
  //       { id: 1, title: 'A post', text: 'Some text', views: 2 },
  //       { id: 2, title: 'Another post', text: 'Some other text', views: 200 }
  //     ];
  //   }
  // },
  // Post: {
  //   author(post) {
  //     return { id: 1, firstName: 'Hello', lastName: 'World' };
  //   }
  // }
};

export default resolvers;