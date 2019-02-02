import React, { Component } from "react";
import styled from "styled-components";
import SavingBox from "../components/SavingBox";
import SavingsPerYear from "./SavingsPerYear";
import SavingsPerRangeFetcher from "../fetchers/SavingsPerRangeFetcher";
import PrimarySavingsPerRangeFetcher from "../fetchers/PrimarySavingsPerRangeFetcher";
import AccountSummariesFetcher from "../fetchers/AccountSummariesFetcher";
import SavingsPerYearFetcher from "../fetchers/SavingsPerYearFetcher";
import Accounts from "./Accounts";

interface IHomeState {
  version: number;
}

class HomePage extends Component<{}, IHomeState> {
  public state: IHomeState = {
    version: 1,
  };
  public render() {
    const { version } = this.state;
    return (
      <div key={version}>
        <SavingsPerRangeFetcher currency="GBP" key={version}>
          {data => (
            <Savings>
              {data.map((s, i) => (
                <SavingBox key={i} saving={s} />
              ))}
            </Savings>
          )}
        </SavingsPerRangeFetcher>

        <PrimarySavingsPerRangeFetcher currency="GBP" key={version}>
          {data => (
            <Savings>
              {data.map((s, i) => (
                <SavingBox key={i} saving={s} />
              ))}
            </Savings>
          )}
        </PrimarySavingsPerRangeFetcher>

        <SavingsPerYearFetcher currency="GBP" key={version}>
          {data => <SavingsPerYear savings={data} />}
        </SavingsPerYearFetcher>

        <AccountSummariesFetcher currency="GBP" key={version}>
          {data => (
            <Accounts
              summary={data.summaries}
              total={data.total}
              onChange={() => this.setState({ version: version + 1 })}
            />
          )}
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

export default HomePage;
