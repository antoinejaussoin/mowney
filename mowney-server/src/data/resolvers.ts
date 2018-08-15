import { Account, Currency, Transaction, User } from "./models";
import savingsPerYear from "./queries/savings-per-year";
import savings, { Range } from "./queries/savings";
import transactions from "./queries/transactions";
import summaries from "./queries/summaries";
import { IResolvers } from "graphql-tools";
import { Context } from "./schema";
// import { QueryResolver, Query} from '../types';
import { GraphQLUpload } from "apollo-server";

const resolvers: IResolvers<any, Context> = {
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
    },
    async transactions(root, args) {
      const user = await User.findById(200);
      const results = await transactions(
        user,
        args.accountId,
        args.offset,
        args.limit,
      );
      return results;
    },
    async savingsPerRange(root, args) {
      const user = await User.findById(200);
      const results = await savings(user, args.currency, args.range);
      return results;
    },
    async savingsAllRanges(root, args) {
      const user = await User.findById(200);
      return Promise.all([
        savings(user, args.currency, Range.currentMonth),
        savings(user, args.currency, Range.lastMonth),
        savings(user, args.currency, Range.sixMonth),
        savings(user, args.currency, Range.oneYear),
        savings(user, args.currency, Range.threeYears),
        savings(user, args.currency, Range.inception),
      ]);
    },
    async summaries(root, args) {
      const user = await User.findById(200);
      return await summaries(user, args.currency);
    },
  },
  Account: {
    async currency(account) {
      return Currency.findById(account.currencyId);
    },
    async transactions(account) {
      return Transaction.findAll({
        where: {
          accountId: account.id,
        },
      });
    },
  },
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
