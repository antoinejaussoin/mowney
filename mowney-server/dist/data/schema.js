"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tools_1 = require("graphql-tools");
// import mocks from './mocks';
var resolvers_1 = require("./resolvers");
// const schema2 = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: 'Query',
//     fields: {
//       accountById: 
//     }
//   }),
//   types: [
//     new GraphQLObjectType({
//       name: 'Account',
//       fields: {
//         id: GraphQL
//       }
//     }),
//   ] 
// })
var typeDefs = "\ntype Query {\n  accountById(id: ID): Account,\n  allAccounts: [Account],\n  savingsPerYear(currency: String): [SavingPerYear],\n  transactions(accountId: ID, limit: Int): [TransactionWithBalance]\n}\n\ntype Account {\n  id: ID,\n  name: String,\n  loaderType: String,\n  isActive: Boolean,\n  isStatEnabled: Boolean,\n  transactions: [Transaction],\n  currency: Currency,\n  owner: User\n}\n\ntype Transaction {\n  id: ID,\n  amount: Float,\n  date: String,\n  description: String,\n  categorisedDate: String,\n  account: Account,\n  category: Category,\n  import: Import,\n  categoryClue: CategoryClue,\n}\n\ntype User {\n  firstName: String,\n  lastName: String,\n  email: String,\n  password: String,\n  isAdministrator: Boolean,\n  currency: Currency\n}\n\ntype Currency {\n  isoCode: String,\n  name: String,\n  isMain: Boolean,\n  symbol: String,\n  format: String\n}\n\ntype ExchangeRate {\n  date: String,\n  rate: Float,\n  currency: Currency\n}\n\ntype Category {\n  name: String,\n  description: String,\n  parent: Category,\n  children: [Category]\n}\n\ntype CategoryClue {\n  type: String,\n  mustBeCredit: Boolean,\n  mustBeDebit: Boolean,\n  validFrom: String,\n  validTo: String,\n  exactString: String,\n  regex: String,\n  category: Category,\n  user: User,\n  restrictToAccount: Account\n}\n\ntype Import {\n  date: String,\n  fileName: String,\n  isManual: Boolean\n}\n\n\ntype SavingPerYear {\n  date: String,\n  amount: Float\n}\n\ntype TransactionWithBalance {\n  id: ID,\n  amount: Float,\n  date: String,\n  description: String,\n  categorisedDate: String,\n  account: Account,\n  category: Category,\n  import: Import,\n  categoryClue: CategoryClue,\n}\n";
var schema = graphql_tools_1.makeExecutableSchema({ typeDefs: typeDefs, resolvers: resolvers_1.default, });
// addMockFunctionsToSchema({ schema, mocks, });
exports.default = schema;
