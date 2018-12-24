import React from "react";
import VerifyPhonePresenter from "./VerifyPhonePresenter";
import { RouteComponentProps } from "react-router";
import { Mutation } from "react-apollo";
import { verifyPhone, verifyPhoneVariables } from "../../types/api";
import { VERIFY_PHONE } from "./VerifyPhoneQuereis";

interface IState {
  key: string;
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
      key: "",
      phoneNumber: props.location.state.phone
    };
  }
  public render() {
    const { key, phoneNumber } = this.state;
    return (
      <VerifyMuataion mutation={VERIFY_PHONE} variables={{ key, phoneNumber }}>
        {(mutation, { loading }) => (
          <VerifyPhonePresenter onChange={this.onInputChange} key={key} />
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
