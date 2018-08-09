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
          {data => (
            <>
              <Savings>
                {data.map((s, i) => <SavingBox key={i} saving={s} />)}
              </Savings>
              <SavingsPerYear />
            </>
          )}
        </SavingsPerRangeFetcher>
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
