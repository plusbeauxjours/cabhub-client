import gql from "graphql-tag";

export const REPORT_LOCATION = gql`
  mutation reportMovemnet($lat: Float!, $lng: Float!) {
    ReportMovement(lastLat: $lat, lastLng: $lng) {
      ok
    }
  }
`;

export const GET_NEARBY_DRIVERS = gql`
  query getDrivers {
    GetNearbyDrivers {
      ok
      drivers {
        id
        lastLat
        lastLng
      }
    }
  }
`;

export const REQUEST_RIDE = gql`
  mutation requestRide(
    $pickUpAddress: String!
    $pickUpLat: Float!
    $pickUpLng: Float!
    $dropOffAddress: String!
    $dropOffLat: Float!
    $dropOffLng: Float!
    $price: Float!
    $distance: String!
    $duration: String!
  ) {
    RequestRide(
      pickUpAddress: $pickUpAddress
      pickUpLat: $pickUpLat
      pickUpLng: $pickUpLng
      dropOffAddress: $dropOffAddress
      dropOffLat: $dropOffLat
      dropOffLng: $dropOffLng
      price: $price
      distance: $distance
      duration: $duration
    ) {
      ok
      error
      ride {
        id
      }
    }
  }
`;