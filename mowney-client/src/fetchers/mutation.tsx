import React, { SFC } from "react";
import { Mutation, MutationFn } from "react-apollo";

function build<TParameters, TResponse, TData>(mutation: any, accessor: string) {
  class GraphQLQuery extends Mutation<TResponse, TParameters> {}
  interface IFetcherProps {
    children: (fn: MutationFn<TResponse, TParameters>) => React.ReactNode;
  }
  const Fetcher: SFC<IFetcherProps> = props => (
    <GraphQLQuery mutation={mutation}>{x => props.children(x)}</GraphQLQuery>
  );
  return Fetcher;
}

export default build;
