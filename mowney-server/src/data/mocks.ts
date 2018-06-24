import * as casual from 'casual';
import { IExecutableSchemaDefinition } from 'graphql-tools';

const mocks = {
  String: () => 'It works!',
  Query: () => ({
    accountById: (root, args) => {
      return { id: args.id };
    },
  }),
  Account: () => ({
    name: () => casual.name,
    loaderType: () => casual.random_element(['QIF', 'CicLoader']),
    isActive: () => casual.boolean,
    isStatEnabled: () => casual.boolean,
  }),
  Transaction: () => ({
    amount: () => casual.random,
    date: () => casual.date,
    description: () => casual.catch_phrase,
    categorisedDate: () => casual.date,
  }),
  User: () => ({
    firstName: () => casual.first_name,
    lastName: () => casual.last_name,
    email: () => casual.email,
    password: () => casual.password,
    isAdministrator: () => casual.boolean,
  }),
  Currency: () => ({
    isoCode: () => casual.country_code,
  }),
};

export default mocks;
