import React from "react";
import { Mutation } from "react-apollo";
import { GET_PLACES } from "../../sharedQueries";
import {
  editPlace,
  editPlaceVariables,
  deletePlace,
  deletePlaceVariables
} from "../../types/api";
import PlacePresenter from "./PlacePresenter";
import { EDIT_PLACE, DELETE_PLACE } from "./PlaceQueries";

interface IProps {
  id: number;
  fav: boolean;
  name: string;
  address: string;
  deletable?: boolean;
}

class EditPlaceMutation extends Mutation<editPlace, editPlaceVariables> {}
class DeletePlaceMutation extends Mutation<deletePlace, deletePlaceVariables> {}

class PlaceContainer extends React.Component<IProps> {
  public render() {
    const { id, fav, name, address, deletable } = this.props;
    return (
      <DeletePlaceMutation
        mutation={DELETE_PLACE}
        variables={{
          placeId: id
        }}
        refetchQueries={[{ query: GET_PLACES }]}
      >
        {deletePlaceFn => (
          <EditPlaceMutation
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
                editPlaceFn={editPlaceFn}
                deletePlaceFn={deletePlaceFn}
                deletable={deletable}
              />
            )}
          </EditPlaceMutation>
        )}
      </DeletePlaceMutation>
    );
  }
}

export default PlaceContainer;
