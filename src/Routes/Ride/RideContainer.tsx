import React from "react";
import RidePresenter from "./RidePresenter";
import { RouteComponentProps } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import {
  getRide,
  getRideVariables,
  userProfile,
  updateRide,
  updateRideVariables
} from "../../types/api";
import { GET_RIDE, UPDATE_RIDE_STATUS, RIDE_SUBSCRIPTION } from "./RideQueries";
import { USER_PROFILE } from "../../sharedQueries";
import { SubscribeToMoreOptions } from "apollo-client";

class RideQuery extends Query<getRide, getRideVariables> {}
class ProfileQuery extends Query<userProfile> {}
class RideUpdate extends Mutation<updateRide, updateRideVariables> {}

interface IProps extends RouteComponentProps<any> {}

class RideContainer extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    const {
      match: {
        params: { rideId }
      },
      history
    } = this.props;
    if (!rideId || !parseInt(rideId, 10)) {
      history.push("/");
    }
  }
  public render() {
    const {
      match: {
        params: { rideId }
      }
    } = this.props;
    return (
      <ProfileQuery query={USER_PROFILE}>
        {({ data: userData, loading: userLoading }) => (
          <RideQuery
            query={GET_RIDE}
            variables={{ rideId: parseFloat(rideId) }}
          >
            {({ data: rideData, loading: rideLoading, subscribeToMore }) => {
              const subscribeOptions: SubscribeToMoreOptions = {
                document: RIDE_SUBSCRIPTION,
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) {
                    return prev;
                  }
                  const {
                    data: {
                      RideStatusSubscription: { status }
                    }
                  } = subscriptionData;
                  if (status === "FINISHED") {
                    window.location.href = "/";
                  }
                }
              };
              subscribeToMore(subscribeOptions);
              return (
                <RideUpdate
                  mutation={UPDATE_RIDE_STATUS}
                  refetchQueries={[
                    {
                      query: GET_RIDE,
                      variables: { rideId: parseInt(rideId, 10) }
                    }
                  ]}
                >
                  {updateRideFn => (
                    <RidePresenter
                      userData={userData}
                      userLoading={userLoading}
                      rideData={rideData}
                      rideLoading={rideLoading}
                      updateRideFn={updateRideFn}
                    />
                  )}
                </RideUpdate>
              );
            }}
          </RideQuery>
        )}
      </ProfileQuery>
    );
  }
}

export default RideContainer;
