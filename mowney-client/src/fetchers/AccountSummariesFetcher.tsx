import gql from "graphql-tag";
import build from "./query";

const QUERY = gql`
  query Summaries($currency: String!) {
    summaries(currency: $currency) {
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
    currency: string;
  },
  {
    summaries: GQL.ISummaries;
  },
  GQL.ISummaries
>(QUERY, "summaries");
