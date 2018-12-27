import React from "react";
import MenuPresenter from "./MenuPresenter";
import { userProfile } from "src/types/api";
import { Query } from "react-apollo";
import { USER_PROFILE } from "../../sharedQueries";

class ProfilQuery extends Query<userProfile> {}

class MenuContainer extends React.Component {
  public render() {
    return (
      <ProfilQuery query={USER_PROFILE}>
        {({ data, loading }) => <MenuPresenter data={data} loading={loading} />}
      </ProfilQuery>
    );
  }
}

export default MenuContainer;
