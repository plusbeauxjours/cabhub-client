import gql from "graphql-tag";

export const EDIT_PLACE = gql`
  mutation editPlace($placeId: Int!, $isFav: Boolean) {
    EditPlace(placeId: $placeId, isFav: $isFav) {
      ok
      error
    }
  }
`;

export const DELETE_PLACE = gql`
  mutation deletePlace($placeId: Int!) {
    DeletePlace(placeId: $placeId) {
      ok
      error
    }
  }
`;
