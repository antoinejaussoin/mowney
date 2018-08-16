import gql from "graphql-tag";
import build from "./query";

const QUERY = gql`
  query Transactions($accountId: ID!, $offset: Int!, $limit: Int!) {
    transactions(accountId: $accountId, offset: $offset, limit: $limit) {
      count
      transactions {
        id
        date
        description
        category {
          name
        }
        amount
        balance
      }
    }
  }
`;

export default build<
  {
    accountId: number;
    offset: number;
    limit: number;
  },
  {
    transactions: GQL.ITransactions;
  },
  GQL.ITransactions
>(QUERY, "transactions");
