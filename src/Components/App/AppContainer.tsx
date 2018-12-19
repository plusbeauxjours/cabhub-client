import React from "react";
import { IS_LOGGED_IN } from "./AppQueries";
import { graphql } from "react-apollo";
import AppPresenter from "./AppPresenter";
import { ThemeProvider } from "src/typed-components";
import theme from "src/theme";

const AppContainer = ({ data }) => (
  <ThemeProvider theme={theme}>
    <AppPresenter isLoggedIn={data.auth.isLoggedIn} />
  </ThemeProvider>
);

export default graphql(IS_LOGGED_IN)(AppContainer);
