import React, { Component } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
} from "@material-ui/core";

interface ILoginProps {
  onLogin(email: string, password: string): void;
}

interface ILoginState {
  email: string;
  password: string;
}

class Login extends Component<ILoginProps, ILoginState> {
  public state: ILoginState = {
    email: "",
    password: "",
  };
  public render() {
    const { email, password } = this.state;
    return (
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
          <Button onClick={() => this.props.onLogin(email, password)}>
            Login
          </Button>
        </CardContent>
      </Card>
    );
  }
}

export default Login;
