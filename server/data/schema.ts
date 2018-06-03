import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';
// import mocks from './mocks';
import resolvers from './resolvers';
import { GraphQLSchema } from 'graphql';

const typeDefs = `
type Query {
  accountById(id: ID): Account,
  allAccounts: [Account]
}

type Account {
  id: ID,
  name: String,
  loaderType: String,
  isActive: Boolean,
  isStatEnabled: Boolean,
  transactions: [Transaction],
  currency: Currency,
  owner: User
}

type Transaction {
  id: ID,
  amount: Float,
  date: String,
  description: String,
  categorisedDate: String,
  account: Account,
  category: Category,
  import: Import,
  categoryClue: CategoryClue,
}

type User {
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  isAdministrator: Boolean,
  currency: Currency
}

type Currency {
  isoCode: String,
  name: String,
  isMain: Boolean,
  symbol: String,
  format: String
}

type ExchangeRate {
  date: String,
  rate: Float,
  currency: Currency
}

type Category {
  name: String,
  description: String,
  parent: Category,
  children: [Category]
}

type CategoryClue {
  type: String,
  mustBeCredit: Boolean,
  mustBeDebit: Boolean,
  validFrom: String,
  validTo: String,
  exactString: String,
  regex: String,
  category: Category,
  user: User,
  restrictToAccount: Account
}

type Import {
  date: String,
  fileName: String,
  isManual: Boolean
}
`;

const schema: GraphQLSchema = makeExecutableSchema({ typeDefs, resolvers, });

// addMockFunctionsToSchema({ schema, mocks, });

export default schema;