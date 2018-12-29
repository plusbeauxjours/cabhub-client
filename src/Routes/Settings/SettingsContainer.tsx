import React from "react";
import SettingsPresenter from "./SettingsPresenter";
import { Query, Mutation } from "react-apollo";
import { userProfile, getPlaces } from "../../types/api";
import { LOG_USER_OUT } from "../../sharedQueries.local";
import { USER_PROFILE, GET_PLACES } from "../../sharedQueries";

class MiniProfile extends Query<userProfile> {}
class PlaceQuery extends Query<getPlaces> {}

class AddPlaceContainer extends React.Component {
  public render() {
    return (
      <Mutation mutation={LOG_USER_OUT}>
        {logUserOut => (
          <MiniProfile query={USER_PROFILE}>
            {({ data: userData, loading: userDataLoading }) => (
              <PlaceQuery query={GET_PLACES}>
                {({ data: placesData, loading: placesLoading }) => (
                  <SettingsPresenter
                    userDataLoading={userDataLoading}
                    placesLoading={placesLoading}
                    userData={userData}
                    placesData={placesData}
                    logUserOut={logUserOut}
                  />
                )}
              </PlaceQuery>
            )}
          </MiniProfile>
        )}
      </Mutation>
    );
  }
}

export default AddPlaceContainer;
