import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";
import Transactions from "./Transactions";
import TransactionsFetcher from "../fetchers/TransactionsFetcher";

interface IAccountState {
  page: number;
  rowsPerPage: number;
  search: string;
}

interface IRouteProps {
  accountId: string | undefined;
}

class Account extends Component<
  RouteComponentProps<IRouteProps>,
  IAccountState
> {
  public state: IAccountState = {
    page: 0,
    rowsPerPage: 30,
    search: "",
  };
  public render() {
    const { page, rowsPerPage, search } = this.state;
    const {
      match: {
        params: { accountId },
      },
    } = this.props;
    return (
      <div>
        <TextField
          label="Search"
          onChange={e => this.setState({ search: e.target.value })}
          value={search}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <TransactionsFetcher
          accountId={Number(accountId)}
          limit={rowsPerPage}
          offset={page * rowsPerPage}
          search={search}
        >
          {transactions => (
            <Transactions
              transactions={transactions.transactions}
              page={page}
              rowsPerPage={rowsPerPage}
              onChangePage={p => this.setState({ page: p })}
              onChangeRowsPerPage={p => this.setState({ rowsPerPage: p })}
              onFirst={() => this.setState({ page: 0 })}
              onLast={() => this.setState({ page: 0 })}
              onNext={() => this.setState({ page: page + 1 })}
              onPrevious={() => this.setState({ page: page - 1 })}
              count={transactions.count}
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
