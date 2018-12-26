import React from "react";
import SocialLoginPresenter from "./SocialLoginPresenter";
import { Mutation, MutationFn } from "react-apollo";
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
  email?: string;
  fbId: string;
}

class SocialLoginContainer extends React.Component<IProps, IState> {
  public mutation: MutationFn;
  public render() {
    const { firstName, lastName, email, fbId } = this.state;
    return (
      <LoginMutaion
        mutation={FACEBOOK_CONNECT}
        variables={{ firstName, lastName, email, fbId }}
      >
        {(facebookConnect, { loading }) => {
          this.mutation = facebookConnect;
          return <SocialLoginPresenter loginCallback={this.callback} />;
        }}
      </LoginMutaion>
    );
  }
  public callback = fbData => {
    this.setState({
      email: fbData.email
    });
    this.mutation();
  };
}

export default SocialLoginContainer;
