import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./layout";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient();

class App extends React.Component {
  public render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
