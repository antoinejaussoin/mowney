import React, { Component } from "react";
import Transactions from "./Transactions";
import TransactionsFetcher from "../fetchers/TransactionsFetcher";

class Account extends Component {
  public render() {
    return (
      <div>
        <TransactionsFetcher accountId={307} limit={10} offset={0}>
          {transactions => <Transactions transactions={transactions} />}
        </TransactionsFetcher>
      </div>
    );
  }
}

// const Savings = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-around;
// `;

export default Account;
