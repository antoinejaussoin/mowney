import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import ls from "local-storage";
import Header from "./header";
import Home from "../home";
import Account from "../account";
import Login from "./login";
import { reAuthenticate, login } from "./api";

const Page = styled.div``;

const Footer = styled.footer``;

const Main = styled.main`
  margin: 10px;
`;

interface IAppProps {
  foo?: string;
}

interface IAppState {
  user: any | null;
  token: string | null;
}

class App extends Component<IAppProps, IAppState> {
  public state: IAppState = {
    user: null,
    token: null,
  };
  public async componentDidMount() {
    const token = ls.get("token");
    if (token) {
      try {
        const user = await reAuthenticate(token);
        console.log("User: ", user);
        this.setState({
          user,
          token,
        });
      } catch (err) {
        console.error("Login error", err);
        ls.remove("token");
      }
    }
  }

  public login = async (email: string, password: string) => {
    try {
      const result = await login(email, password);
      console.log("result", result);
      this.setState({
        user: result.user,
        token: result.token,
      });
      ls.set("token", result.token);
    } catch (err) {
      console.error("Error while login: ", err);
    }
  };

  public render() {
    if (!this.state.user) {
      return <Login onLogin={this.login} />;
    }
    return (
      <Page>
        <Header />
        <Main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/account/:accountId" exact component={Account} />
          </Switch>
        </Main>
        <Footer />
      </Page>
    );
  }
}

export default App;
