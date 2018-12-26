import React from "react";
import SocialLoginPresenter from "./SocialLoginPresenter";
import { Mutation } from "react-apollo";
import { facebookConnect, facebookConnectVariables } from "../../types/api";
import { FACEBOOK_CONNECT } from "./SocialLoginQueries";
import { RouteChildrenProps } from "react-router";

class LoginMutaion extends Mutation<
  facebookConnect,
  facebookConnectVariables
> {}

interface IProps extends RouteChildrenProps<any> {}

interface IState {
  firstName: string;
  lastName: string;
  emgil?: string;
  fbId: string;
}

class SocialLoginContainer extends React.Component<IProps, IState> {
  public render() {
    return (
      <LoginMutaion mutation={FACEBOOK_CONNECT}>
        <SocialLoginPresenter />;
      </LoginMutaion>
    );
  }
}

export default SocialLoginContainer;
