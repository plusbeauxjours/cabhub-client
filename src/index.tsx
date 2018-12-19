import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App/index";
import { ApolloProvider } from "react-apollo";
import client from "./apollo";
import GlobalStyle from "src/global-styles";

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
    <GlobalStyle />
  </ApolloProvider>,
  document.getElementById("root")
);
