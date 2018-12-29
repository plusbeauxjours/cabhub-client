import React from "react";
import SettingsPresenter from "./SettingsPresenter";
import { Query, Mutation } from "react-apollo";
import { userProfile } from "../../types/api";
import { LOG_USER_OUT } from "../../sharedQueries.local";
import { USER_PROFILE } from "../../sharedQueries";

class MiniProfile extends Query<userProfile> {}

class AddPlaceContainer extends React.Component {
  public render() {
    return (
      <Mutation mutation={LOG_USER_OUT}>
        {logUserOut => (
          <MiniProfile query={USER_PROFILE}>
            {({ data, loading: userDataLoading }) => (
              <SettingsPresenter
                userDataLoading={userDataLoading}
                userData={data}
                logUserOut={logUserOut}
              />
            )}
          </MiniProfile>
        )}
      </Mutation>
    );
  }
}

export default AddPlaceContainer;
