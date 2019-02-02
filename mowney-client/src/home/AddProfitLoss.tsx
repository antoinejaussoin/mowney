import React from "react";
import styled from "styled-components";
import moment from "moment";
import { Input, Button } from "@material-ui/core";
import AddTransactionFetcher from "../fetchers/AddTransactionFetcher";

interface IAddProfitLossProps {
  accountId: string;
}

interface IAddProfitLossState {
  amount: number | null;
}

class AddProfitLoss extends React.Component<
  IAddProfitLossProps,
  IAddProfitLossState
> {
  public state: IAddProfitLossState = {
    amount: null,
  };
  public render() {
    const { amount } = this.state;
    const { accountId } = this.props;
    return (
      <AddTransactionFetcher>
        {addTransaction => (
          <Container>
            <Input
              type="numeric"
              value={amount ? amount.toString() : ""}
              onChange={e => this.setState({ amount: +e.target.value })}
            />
            <Button
              onClick={async () => {
                const result = await addTransaction({
                  variables: {
                    accountId,
                    amount: amount || 0,
                    date: moment().format("YYYY-MM-DD"),
                    description: "Change",
                  },
                });
                if (result && result.data && result.data.addTransaction) {
                  const transaction = result.data.addTransaction;
                  console.log("Created: ", transaction);
                  this.setState({ amount: null });
                }
              }}
            >
              Add
            </Button>
          </Container>
        )}
      </AddTransactionFetcher>
    );
  }
}

const Container = styled.div`
  display: flex;
`;

export default AddProfitLoss;
