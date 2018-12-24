import React from "react";
import VerifyPhonePresenter from "./VerifyPhonePresenter";
import { RouteComponentProps } from "react-router";

interface IState {
  key: string;
}

interface IProps extends RouteComponentProps<any> {}

class VerifyPhoneContainer extends React.Component<IProps, IState> {
  public state = {
    key: ""
  };
  constructor(props: IProps) {
    super(props);
    if (!props.location.state) {
      props.history.push("/");
    }
  }
  public render() {
    const { key } = this.state;
    return <VerifyPhonePresenter onChange={this.onInputChange} key={key} />;
  }
  public onInputChange = event => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };
}

export default VerifyPhoneContainer;
