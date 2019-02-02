import gql from "graphql-tag";
import build from "./mutation";

// addTransaction(
//   accountId: ID!
//   date: String!
//   description: String!
//   amount: Float!
// ): Transaction!

const QUERY = gql`
  mutation AddTransaction(
    $accountId: ID!
    $date: String!
    $description: String!
    $amount: Float!
  ) {
    addTransaction(
      accountId: $accountId
      date: $date
      description: $description
      amount: $amount
    ) {
      id
      amount
      date
      description
      account {
        id
        name
      }
    }
  }
`;

export default build<
  {
    accountId: string;
    date: string;
    description: string;
    amount: number;
  },
  {
    addTransaction: GQL.ITransaction;
  },
  string
>(QUERY, "addTransaction");
