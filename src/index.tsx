import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App/index";
import { ApolloProvider } from "react-apollo";
import client from "./apollo";

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root") as HTMLElement
);
