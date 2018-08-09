import gql from "graphql-tag";
import build from "./build";

const QUERY = gql`
  query Savings($currency: String!) {
    savingsAllRanges(currency: $currency) {
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
>(QUERY, "savingsAllRanges");
