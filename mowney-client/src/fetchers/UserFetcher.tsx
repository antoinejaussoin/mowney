import React from "react";
import gql from "graphql-tag";
import { Query, QueryResult } from "react-apollo";

const QUERY = gql`
  {
    me {
      id
      firstName
      lastName
    }
  }
`;

interface IResponse {
  me: GQL.IUser;
}

class GraphQLQuery extends Query<IResponse, {}> {}

interface IUserFetcherProps {
  children: (result: QueryResult<IResponse, {}>) => React.ReactNode;
}

const Fetcher: React.SFC<IUserFetcherProps> = props => (
  <GraphQLQuery query={QUERY}>{x => props.children(x)}</GraphQLQuery>
);

export default Fetcher;
