import React from "react";
import { Mutation } from "react-apollo";
import { editPlace, editPlaceVariables } from "../../types/api";
import { EDIT_PLACE } from "./PlacesQueries";
import { GET_PLACES } from "../../sharedQueries";
import PlacePresenter from "./PlacePresenter";

interface IProps {
  fav: boolean;
  name: string;
  address: string;
  id: number;
}
class FavMutation extends Mutation<editPlace, editPlaceVariables> {}

class PlacesContainer extends React.Component<IProps> {
  public render() {
    const { fav, name, address, id } = this.props;
    return (
      <FavMutation
        mutation={EDIT_PLACE}
        variables={{ isFav: !fav, placeId: id }}
        refetchQueries={[{ query: GET_PLACES }]}
      >
        {editPlaceFn => (
          <PlacePresenter
            onstarPress={editPlaceFn}
            fav={fav}
            name={name}
            address={address}
          />
        )}
      </FavMutation>
    );
  }
}

export default PlacesContainer;
