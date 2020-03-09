import React from "react";
import MenuPresenter from "./MenuPresenter";
import { Query, Mutation } from "react-apollo";
import { USER_PROFILE, GET_MY_RIDES } from "../../sharedQueries";
import { toggleDriving, userProfile, getMyRides } from "../../types/api";
import { TOGGLE_DRIVING } from "./MenuQueries";

class ProfileQuery extends Query<userProfile> {}
class RidesQuery extends Query<getMyRides> {}
class ToggleDrivingMutation extends Mutation<toggleDriving> {}

class MenuContainer extends React.Component {
  public render() {
    return (
      <RidesQuery query={GET_MY_RIDES}>
        {({ data: ridesData, loading: ridesLoading }) => (
          <ToggleDrivingMutation
            mutation={TOGGLE_DRIVING}
            refetchQueries={[{ query: GET_MY_RIDES }]}
            update={(cache, { data }) => {
              if (data) {
                const { ToggleDrivingMode } = data;
                if (!ToggleDrivingMode.ok) {
                  console.log(ToggleDrivingMode.error);
                  return;
                }
                const query: userProfile | null = cache.readQuery({
                  query: USER_PROFILE
                });
                if (query) {
                  const {
                    GetMyProfile: { user }
                  } = query;
                  if (user) {
                    user.isDriving = !user.isDriving;
                  }
                }
                cache.writeQuery({ query: USER_PROFILE, data: query });
              }
            }}
          >
            {toggleDrivingFn => (
              <ProfileQuery query={USER_PROFILE}>
                {({ data, loading }) => (
                  <MenuPresenter
                    ridesData={ridesData}
                    ridesLoading={ridesLoading}
                    data={data}
                    loading={loading}
                    toggleDrivingFn={toggleDrivingFn}
                  />
                )}
              </ProfileQuery>
            )}
          </ToggleDrivingMutation>
        )}
      </RidesQuery>
    );
  }
}

export default MenuContainer;
