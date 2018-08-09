import gql from "graphql-tag";
import build from "./build";

const QUERY = gql`
  {
    summaries(currency: "GBP") {
      summaries {
        id
        name
        currency
        balance
        balanceInCurrency
        rateToUsd
        rateToCurrency
      }
      total
    }
  }
`;

export default build<
  {
    summaries: GQL.ISummaries;
  },
  GQL.ISummaries
>(QUERY, "summaries");
