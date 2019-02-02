import React, { SFC } from "react";
import { omit } from "lodash";
import { Query } from "react-apollo";

function build<TParameters, TResponse, TData>(
  query: any,
  accessor: string,
  loader?: React.ReactNode,
) {
  class GraphQLQuery extends Query<TResponse, {}> {}
  interface IFetcherProps {
    children: (result: TData) => React.ReactNode;
  }
  const Fetcher: SFC<IFetcherProps & TParameters> = props => (
    <GraphQLQuery query={query} variables={omit(props, "children")}>
      {({ data, loading }) => {
        if (loading) {
          return loader || "Loading...";
        }
        // console.log("data: ", data);
        console.log("data: ", data);
        console.log("accessor: ", accessor);
        return props.children(data![accessor]);
      }}
    </GraphQLQuery>
  );
  return Fetcher;
}

export default build;
