import React from "react";
import SocialLoginPresenter from "./SocialLoginPresenter";
import { Mutation, MutationFn } from "react-apollo";
import { facebookConnect, facebookConnectVariables } from "../../types/api";
import { FACEBOOK_CONNECT } from "./SocialLoginQueries";
import { RouteChildrenProps } from "react-router";
import { toast } from "react-toastify";

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
  public state = {
    firstName: "",
    lastName: "",
    email: "",
    fbId: ""
  };
  public facebookMutation: MutationFn;
  public render() {
    return (
      <LoginMutaion mutation={FACEBOOK_CONNECT}>
        {(facebookMutation, { loading }) => {
          this.facebookMutation = facebookMutation;
          return <SocialLoginPresenter loginCallback={this.loginCallback} />;
        }}
      </LoginMutaion>
    );
  }
  public loginCallback = response => {
    const { first_name, last_name, email, name, id, accessToken } = response;
    if (accessToken) {
      toast.success(`Welcom ${name}!`);
      this.facebookMutation({
        variables: {
          email,
          fbId: id,
          firstName: first_name,
          lastName: last_name
        }
      });
    } else {
      toast.error("COuld not log you in 😔");
    }
  };
}

export default SocialLoginContainer;
