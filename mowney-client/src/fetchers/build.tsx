import React, { SFC } from "react";
import { Query } from "react-apollo";

function build<TResponse, TData>(query: any, accessor: string) {
  class GraphQLQuery extends Query<TResponse, {}> {}
  const Fetcher: SFC<{
    children: (result: TData) => React.ReactNode;
  }> = ({ children }) => (
    <GraphQLQuery query={query}>
      {({ data, loading }) => {
        if (loading) {
          return "Loading...";
        }
        console.log("data: ", data);
        return children(data![accessor]);
      }}
    </GraphQLQuery>
  );
  return Fetcher;
}

export default build;
