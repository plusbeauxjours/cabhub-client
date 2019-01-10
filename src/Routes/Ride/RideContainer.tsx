import React from "react";
import RidePresenter from "./RidePresenter";
import { RouteComponentProps } from "react-router-dom";
import { Query } from "react-apollo";
import { getRide, getRideVariables } from "../../types/api";
import { GET_RIDE } from "./RideQueries";

class RideQuery extends Query<getRide, getRideVariables> {}

interface IProps extends RouteComponentProps<any> {}

class RideContainer extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    if (!props.match.params.rideId) {
      props.history.push("/");
    }
  }
  public render() {
    const {
      match: {
        params: { rideId }
      }
    };
    return (
      <RideQuery query={GET_RIDE} variables={{ rideId }}>
        {data => <RidePresenter data={data} />}
      </RideQuery>
    );
  }
}

export default RideContainer;
