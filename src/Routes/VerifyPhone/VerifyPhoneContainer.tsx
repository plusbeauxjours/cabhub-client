import React from "react";
import VerifyPhonePresenter from "./VerifyPhonePresenter";
import { RouteComponentProps } from "react-router";

interface IProps extends RouteComponentProps<any> {}

class VerifyPhoneContainer extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    if (!props.location.state) {
      props.history.push("/");
    }
  }
  public render() {
    return <VerifyPhonePresenter />;
  }
}

export default VerifyPhoneContainer;
