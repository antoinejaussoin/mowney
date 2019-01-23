import gql from "graphql-tag";
import build from "./query";

const QUERY = gql`
  query Savings($currency: String!) {
    primarySavingsAllRanges(currency: $currency) {
      amount
      from
      to
      range
      months
      amountPerMonth
    }
  }
`;

export default build<
  { currency: string },
  {
    savingsAllRanges: [GQL.ISavingPerRange];
  },
  [GQL.ISavingPerRange]
>(QUERY, "primarySavingsAllRanges");
