import React, { Component } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
} from "@material-ui/core";
import LoginFetcher from "../fetchers/LoginFetcher";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { ApolloConsumer } from "react-apollo";

interface ILoginState {
  email: string;
  password: string;
}

class Login extends Component<RouteComponentProps<{}>, ILoginState> {
  public state: ILoginState = {
    email: "",
    password: "",
  };
  public render() {
    const { email, password } = this.state;
    const { history } = this.props;
    return (
      <ApolloConsumer>
        {client => (
          <LoginFetcher>
            {login => (
              <Card>
                <CardHeader title="Login" />
                <CardContent>
                  <TextField
                    label="Email"
                    value={email}
                    onChange={v => this.setState({ email: v.target.value })}
                  />
                  <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={p => this.setState({ password: p.target.value })}
                  />
                  <Button
                    onClick={async () => {
                      const result = await login({
                        variables: {
                          email,
                          password,
                        },
                      });
                      if (result && result.data && result.data.login) {
                        localStorage.setItem("token", result.data.login);
                        client.resetStore();
                        history.push("/");
                      }
                    }}
                  >
                    Login
                  </Button>
                </CardContent>
              </Card>
            )}
          </LoginFetcher>
        )}
      </ApolloConsumer>
    );
  }
}

export default withRouter(Login);
