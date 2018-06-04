import { Account, Currency, Transaction, User } from './models';
import savingsPerYear from './queries/savings-per-year';
import { FindOptions } from 'sequelize';
// import Currency from './models/currency';

const resolvers = {
  Query: {
    async accountById(root, args) {
      return Account.findById(args.id);
    },
    async allAccounts(root, args) {
      return Account.findAll();
    },
    async savingsPerYear(root, args) {
      const user = await User.findById(200);
      const results = await savingsPerYear(user, args.currency);
      return results;
    }
  },
  Account: {
    async currency(account) {
      return Currency.findById(account.currencyId);
    },
    async transactions(account) {
      return Transaction.findAll({
        where: {
          accountId: account.id
        }
      });
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