import React from "react";
import { Mutation } from "react-apollo";
import { GET_PLACES } from "../../sharedQueries";
import { editPlace, editPlaceVariables } from "../../types/api";
import PlacePresenter from "./PlacePresenter";
import { EDIT_PLACE } from "./PlaceQueries";

interface IProps {
  id: number;
  fav: boolean;
  name: string;
  address: string;
}

class FavMutation extends Mutation<editPlace, editPlaceVariables> {}

class PlaceContainer extends React.Component<IProps> {
  public render() {
    const { id, fav, name, address } = this.props;
    return (
      <FavMutation
        mutation={EDIT_PLACE}
        variables={{
          placeId: id,
          isFav: !fav
        }}
        refetchQueries={[{ query: GET_PLACES }]}
      >
        {editPlaceFn => (
          <PlacePresenter
            fav={fav}
            name={name}
            address={address}
            onStarPress={editPlaceFn}
          />
        )}
      </FavMutation>
    );
  }
}

export default PlaceContainer;
