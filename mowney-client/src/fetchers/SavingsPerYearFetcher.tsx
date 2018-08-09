import gql from "graphql-tag";
import build from "./build";

const QUERY = gql`
  {
    savingsPerYear(currency: "GBP") {
      date
      amount
    }
  }
`;

export default build<
  {
    savingsPerYear: [GQL.ISavingPerYear];
  },
  [GQL.ISavingPerYear]
>(QUERY, "savingsPerYear");
