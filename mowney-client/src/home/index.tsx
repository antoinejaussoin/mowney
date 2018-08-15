import React, { Component } from "react";
import styled from "styled-components";
import SavingBox from "../components/SavingBox";
import SavingsPerYear from "./SavingsPerYear";
import SavingsPerRangeFetcher from "../fetchers/SavingsPerRangeFetcher";
import AccountSummariesFetcher from "../fetchers/AccountSummariesFetcher";
import SavingsPerYearFetcher from "../fetchers/SavingsPerYearFetcher";
import Accounts from "./Accounts";

class App extends Component {
  public render() {
    return (
      <div>
        <SavingsPerRangeFetcher currency="GBP">
          {data => (
            <Savings>
              {data.map((s, i) => (
                <SavingBox key={i} saving={s} />
              ))}
            </Savings>
          )}
        </SavingsPerRangeFetcher>

        <SavingsPerYearFetcher currency="GBP">
          {data => <SavingsPerYear savings={data} />}
        </SavingsPerYearFetcher>

        <AccountSummariesFetcher currency="GBP">
          {data => <Accounts summary={data.summaries} total={data.total} />}
        </AccountSummariesFetcher>
      </div>
    );
  }
}

const Savings = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export default App;
