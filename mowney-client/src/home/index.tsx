import React, { Component, SFC } from "react";
import { Query, QueryResult } from "react-apollo";
import styled from "styled-components";
import gql from "graphql-tag";
import SavingBox from "../components/SavingBox";
import SavingsPerYear from "./SavingsPerYear";

class App extends Component {
  public render() {
    return (
      <div>
        <DashboardQuery>
          {({ data, loading }) => {
            if (loading) {
              return "Loading...";
            }
            console.log("data: ", data);
            return (
              <>
                <Savings>
                  {data!.savingsAllRanges.map((s, i) => (
                    <SavingBox key={i} saving={s} />
                  ))}
                </Savings>
                <SavingsPerYear />
              </>
            );
          }}
        </DashboardQuery>
      </div>
    );
  }
}

const SAVINGS_QUERY = gql`
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

const Savings = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

interface IData {
  savingsAllRanges: [GQL.ISavingPerRange];
}

class SavingsQuery extends Query<IData, {}> {}

const DashboardQuery: SFC<{
  children: (result: QueryResult<IData>) => React.ReactNode;
}> = ({ children }) => (
  <SavingsQuery query={SAVINGS_QUERY} children={children} />
);

export default App;
