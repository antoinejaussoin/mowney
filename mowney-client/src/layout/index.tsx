import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Header from "./header";
import Home from "../home";
import Account from "../account";
import Login from "./login";
import UserFetcher from "../fetchers/UserFetcher";

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

  public render() {
    return (
      <Page>
        <Header />
        <Main>
          <UserFetcher>
            {data => {
              if (!data.loading) {
                if (data.error) {
                  return <Login />;
                } else if (data.data && data.data.me) {
                  return (
                    <Switch>
                      <Route path="/login" exact component={() => <Login />} />
                      <Route path="/" exact component={Home} />
                      <Route
                        path="/account/:accountId"
                        exact
                        component={Account}
                      />
                    </Switch>
                  );
                }
              }
              return "Loading...";
            }}
          </UserFetcher>
        </Main>
        <Footer />
      </Page>
    );
  }
}

export default App;
