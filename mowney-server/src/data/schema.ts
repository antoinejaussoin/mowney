import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";
import resolvers from "./resolvers";
import { GraphQLSchema } from "graphql";
import gql from "graphql-tag";
import { IUser } from "./models/user";

const typeDefs = gql`
  type Query {
    me: User!
    accountById(id: ID!): Account!
    allAccounts: [Account!]!
    summaries(currency: String!): Summaries!
    savingsPerYear(currency: String!): [SavingPerYear!]!
    savingsPerRange(currency: String!, range: Range): SavingPerRange!
    savingsAllRanges(currency: String!): [SavingPerRange!]!
    primarySavingsAllRanges(currency: String!): [SavingPerRange!]!
    transactions(
      accountId: ID!
      search: String
      offset: Int!
      limit: Int!
    ): Transactions!
  }

  type Mutation {
    login(email: String!, password: String!): String!
    addTransaction(
      accountId: ID!
      date: String!
      description: String!
      amount: Float!
    ): Transaction!
  }

  enum Range {
    currentMonth
    lastMonth
    sixMonth
    oneYear
    threeYears
    inception
  }

  type Account {
    id: ID!
    name: String!
    loaderType: String!
    isActive: Boolean!
    isStatEnabled: Boolean!
    transactions: [Transaction!]!
    currency: Currency!
    owner: User!
  }

  type AccountSummary {
    id: ID!
    name: String!
    currency: String!
    balance: Float!
    balanceInCurrency: Float!
    rateToUsd: Float
    rateToCurrency: Float
  }

  type Summaries {
    summaries: [AccountSummary!]!
    total: Float!
  }

  type Transaction {
    id: ID!
    amount: Float!
    date: String!
    description: String!
    categorisedDate: String
    account: Account!
    category: Category
    import: Import
    categoryClue: CategoryClue
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    isAdministrator: Boolean!
    currency: Currency!
  }

  type Currency {
    isoCode: String!
    name: String!
    isMain: Boolean!
    symbol: String!
    format: String!
  }

  type ExchangeRate {
    date: String!
    rate: Float!
    currency: Currency!
  }

  type Category {
    name: String!
    description: String!
    parent: Category
    children: [Category!]!
  }

  type CategoryClue {
    type: String!
    mustBeCredit: Boolean!
    mustBeDebit: Boolean!
    validFrom: String!
    validTo: String!
    exactString: String
    regex: String
    category: Category!
    user: User!
    restrictToAccount: Account
  }

  type Import {
    date: String!
    fileName: String!
    isManual: Boolean!
  }

  type SavingPerYear {
    date: String!
    amount: Float!
  }

  type SavingPerRange {
    from: String!
    to: String!
    range: Range!
    amount: Float
    months: Float!
    amountPerMonth: Float
  }

  type Transactions {
    count: Int!
    transactions: [TransactionWithBalance!]!
  }

  type TransactionWithBalance {
    id: ID!
    amount: Float!
    date: String!
    description: String!
    categorisedDate: String
    account: Account!
    category: Category
    import: Import
    categoryClue: CategoryClue
    balance: Float!
  }
`;

export interface Context {
  user: IUser;
}

const schema: GraphQLSchema = makeExecutableSchema<Context>({
  typeDefs,
  resolvers,
});

// addMockFunctionsToSchema({ schema, mocks, });

export default schema;
