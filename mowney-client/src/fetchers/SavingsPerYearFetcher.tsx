import gql from "graphql-tag";
import build from "./build";

const QUERY = gql`
  query Savings($currency: String!) {
    savingsPerYear(currency: $currency) {
      date
      amount
    }
  }
`;

export default build<
  { currency: string },
  {
    savingsPerYear: [GQL.ISavingPerYear];
  },
  [GQL.ISavingPerYear]
>(QUERY, "savingsPerYear");
