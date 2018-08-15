import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import Transactions from "./Transactions";
import TransactionsFetcher from "../fetchers/TransactionsFetcher";

interface IAccountState {
  page: number;
  rowsPerPage: number;
}

interface IRouteProps {
  accountId: number;
}

class Account extends Component<
  RouteComponentProps<IRouteProps>,
  IAccountState
> {
  public state: IAccountState = {
    page: 0,
    rowsPerPage: 25,
  };
  public render() {
    const { page, rowsPerPage } = this.state;
    const {
      match: {
        params: { accountId },
      },
    } = this.props;
    return (
      <div>
        <TransactionsFetcher
          accountId={accountId}
          limit={rowsPerPage}
          offset={page * rowsPerPage}
        >
          {transactions => (
            <Transactions
              transactions={transactions}
              page={page}
              rowsPerPage={rowsPerPage}
              onChangePage={p => this.setState({ page: p })}
              onFirst={() => this.setState({ page: 0 })}
              onLast={() => this.setState({ page: 0 })}
              onNext={() => this.setState({ page: page + 1 })}
              onPrevious={() => this.setState({ page: page - 1 })}
              count={10000}
            />
          )}
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

export default withRouter(Account);
