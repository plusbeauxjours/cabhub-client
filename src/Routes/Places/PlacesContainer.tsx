import React from "react";
import PlacesPresenter from "./PlacesPresenter";
import { Query } from "react-apollo";
import { getPlaces } from "src/types/api";
import { GET_PLACES } from "../../sharedQueries";

class PlaceQuery extends Query<getPlaces> {}

class PlacesContainer extends React.Component {
  public render() {
    return (
      <PlaceQuery query={GET_PLACES}>
        {({ data, loading }) => (
          <PlacesPresenter data={data} loading={loading} />
        )}
      </PlaceQuery>
    );
  }
}

export default PlacesContainer;
