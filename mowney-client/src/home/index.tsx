import React, { Component } from "react";
import styled from "styled-components";
import SavingBox from "../components/SavingBox";
import SavingsPerYear from "./SavingsPerYear";
import SavingsPerRangeFetcher from "../fetchers/SavingsPerRangeFetcher";

class App extends Component {
  public render() {
    return (
      <div>
        <SavingsPerRangeFetcher>
          {data => {
            return (
              <>
                <Savings>
                  {data.map((s, i) => <SavingBox key={i} saving={s} />)}
                </Savings>
                <SavingsPerYear />
              </>
            );
          }}
        </SavingsPerRangeFetcher>
      </div>
    );
  }
}

// const SAVINGS_QUERY = gql`
//   {
//     savingsAllRanges(currency: "GBP") {
//       amount
//       from
//       to
//       range
//       months
//       amountPerMonth
//     }
//   }
// `;

const Savings = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

// interface IData {
//   savingsAllRanges: [GQL.ISavingPerRange];
// }

// class SavingsQuery extends Query<IData, {}> {}

// const DashboardQuery: SFC<{
//   children: (result: QueryResult<IData>) => React.ReactNode;
// }> = ({ children }) => (
//   <SavingsQuery query={SAVINGS_QUERY} children={children} />
// );

export default App;
