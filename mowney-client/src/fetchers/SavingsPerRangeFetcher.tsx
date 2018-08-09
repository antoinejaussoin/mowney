import gql from "graphql-tag";
import build from "./build";

const QUERY = gql`
  {
    savingsAllRanges(currency: "GBP") {
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
  {
    savingsAllRanges: [GQL.ISavingPerRange];
  },
  [GQL.ISavingPerRange]
>(QUERY, "savingsAllRanges");
