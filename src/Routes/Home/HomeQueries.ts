import gql from "graphql-tag";

export const REPORT_LOCATION = gql`
  mutation reportMovemnet($lat: Float!, $lng: Float!) {
    ReportMovement(lastLat: $lat, lastLng: $lng) {
      ok
    }
  }
`;
