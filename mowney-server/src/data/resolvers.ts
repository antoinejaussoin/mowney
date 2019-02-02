import { Account, Currency, Transaction, User, Category } from "./models";
import { verifyPassword } from "../data/models/user";
import savingsPerYear from "./queries/savings-per-year";
import savings, { Range } from "./queries/savings";
import transactions from "./queries/transactions";
import summaries from "./queries/summaries";
import addTransaction from "./mutations/add-transaction";
import { IResolvers } from "graphql-tools";
import { Context } from "./schema";
import { pick } from "lodash";
import * as jwt from "jsonwebtoken";

const tokenSecret = "todo";

const resolvers: IResolvers<any, Context> = {
  Query: {
    async me(root, args, { user }) {
      if (!user) {
        throw new Error("Not logged in");
      }
      return user;
    },
    async accountById(root, args, { user }) {
      const account = await Account.findById(args.id, {
        include: [{ model: User, as: "owner" }],
      });
      if (account.owner.id !== user.id) {
        throw new Error("Unauthorized");
      }
      return account;
    },
    async allAccounts(root, args, { user }) {
      return Account.find({
        where: {
          userId: user.id,
        },
      });
    },
    async savingsPerYear(root, args, { user }) {
      const results = await savingsPerYear(user, args.currency);
      return results;
    },
    async transactions(root, args, { user }) {
      return await transactions(
        user,
        args.accountId,
        args.search,
        args.offset,
        args.limit,
      );
    },
    async savingsPerRange(root, args, { user }) {
      const results = await savings(user, args.currency, args.range);
      return results;
    },
    async savingsAllRanges(root, args, { user }) {
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
  Mutation: {
    async login(_, { email, password }) {
      const dbUser = await User.findOne({ where: { email } });

      if (!dbUser) {
        throw new Error("No user with that email");
      }

      const isValid = await verifyPassword(dbUser, password);
      if (!isValid) {
        throw new Error("User or password incorrect");
      }

      const user = pick(dbUser, [
        "firstName",
        "lastName",
        "email",
        "isAdmin",
        "id",
      ]);

      return jwt.sign(user, tokenSecret, { expiresIn: "1y" });
    },
    async addTransaction(
      _,
      { accountId, date, description, amount },
      { user },
    ) {
      const account = await Account.findById(accountId, {
        include: [{ model: User, as: "owner" }],
      });
      console.log("Logged in: ", user);
      console.log("Owner: ", account.owner);
      if (account.owner.id !== user.id) {
        throw new Error("Unauthorized");
      }
      return await addTransaction(accountId, date, description, amount);
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
  TransactionWithBalance: {
    async category(transaction) {
      return Category.findById(transaction.category);
    },
  },
};

export default resolvers;
