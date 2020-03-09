import React from "react";
import SocialLoginPresenter from "./SocialLoginPresenter";
import { Mutation, MutationFn } from "react-apollo";
import { facebookConnect, facebookConnectVariables } from "../../types/api";
import { FACEBOOK_CONNECT } from "./SocialLoginQueries";
import { RouteChildrenProps } from "react-router";
import { toast } from "react-toastify";
import { LOG_USER_IN } from "../../sharedQueries.local";

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
      <Mutation mutation={LOG_USER_IN}>
        {logUserIn => (
          <LoginMutaion
            mutation={FACEBOOK_CONNECT}
            onCompleted={data => {
              const { FacebookConnect } = data;
              if (FacebookConnect.ok) {
                logUserIn({
                  variables: {
                    token: FacebookConnect.token
                  }
                });
              } else {
                console.log(FacebookConnect.error);
              }
            }}
          >
            {(facebookMutation, { loading }) => {
              this.facebookMutation = facebookMutation;
              return (
                <SocialLoginPresenter loginCallback={this.loginCallback} />
              );
            }}
          </LoginMutaion>
        )}
      </Mutation>
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
      console.log("Could not log you in 😔");
    }
  };
}

export default SocialLoginContainer;
