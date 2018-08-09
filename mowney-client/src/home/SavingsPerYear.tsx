import React, { Component, SFC } from "react";
import { Query, QueryResult } from "react-apollo";
// import styled from "styled-components";
import gql from "graphql-tag";
import {
  BarChart,
  Bar,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import ContainerDimensions from "react-container-dimensions";

class SavingsPerYear extends Component {
  public render() {
    return (
      <SavingsPerYearFetcher>
        {({ data, loading }) => {
          if (loading) {
            return "Loading...";
          }
          console.log("data: ", data);
          return (
            <ContainerDimensions>
              {({ width }: { width: number }) => (
                <BarChart
                  data={data!.savingsPerYear}
                  margin={{ top: 5, bottom: 5 }}
                  height={600}
                  width={width}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <ReferenceLine y={0} stroke="#000" />
                  <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
              )}
            </ContainerDimensions>
          );
        }}
      </SavingsPerYearFetcher>
    );
  }
}

const SAVINGS_PER_YEAR_QUERY = gql`
  {
    savingsPerYear(currency: "GBP") {
      date
      amount
    }
  }
`;

interface IData {
  savingsPerYear: [GQL.ISavingPerYear];
}

class SavingsPerYearQuery extends Query<IData, {}> {}

const SavingsPerYearFetcher: SFC<{
  children: (result: QueryResult<IData>) => React.ReactNode;
}> = ({ children }) => (
  <SavingsPerYearQuery query={SAVINGS_PER_YEAR_QUERY} children={children} />
);

export default SavingsPerYear;
