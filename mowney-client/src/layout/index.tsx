import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Header from './header';
import Home from '../home';

const Page = styled.div`

`;

const Footer = styled.footer`

`;

const Main = styled.main`
  margin: 10px;
`;

class App extends Component {
  public render() {
    return (
      <Page>
        <Header />
        <Main>
          <Switch>
            <Route path="/" exact component={Home} />
          </Switch>
        </Main>
        <Footer />
      </Page>
    );
  }
}

export default App;
