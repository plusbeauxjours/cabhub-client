import React from "react";
import VerifyPhonePresenter from "./VerifyPhonePresenter";
import { RouteComponentProps } from "react-router";
import { Mutation } from "react-apollo";
import { verifyPhone, verifyPhoneVariables } from "../../types/api";
import { VERIFY_PHONE } from "./VerifyPhoneQuereis";
import { toast } from "react-toastify";

interface IState {
  verificationKey: string;
  phoneNumber: string;
}

interface IProps extends RouteComponentProps<any> {}

class VerifyMuataion extends Mutation<verifyPhone, verifyPhoneVariables> {}

class VerifyPhoneContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    if (!props.location.state) {
      props.history.push("/");
    }
    this.state = {
      phoneNumber: props.location.state.phone,
      verificationKey: ""
    };
  }
  public render() {
    const { verificationKey, phoneNumber } = this.state;
    return (
      <VerifyMuataion
        mutation={VERIFY_PHONE}
        variables={{
          key: verificationKey,
          phoneNumber
        }}
        onCompleted={data => {
          const { CompletePhoneVerification } = data;
          if (CompletePhoneVerification.ok) {
            toast.success("You're verified, loggin in now");
          } else {
            toast.error(CompletePhoneVerification.error);
          }
        }}
      >
        {(mutation, { loading }) => (
          <VerifyPhonePresenter
            onChange={this.onInputChange}
            onSubmit={mutation}
            verificationKey={verificationKey}
            loading={loading}
          />
        )}
      </VerifyMuataion>
    );
  }
  public onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };
}

export default VerifyPhoneContainer;
