import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./layout";
import client from "./client";
import { ApolloProvider } from "react-apollo";

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
