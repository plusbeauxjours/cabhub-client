import { gql } from "apollo-boost";

export const UPDATE_PROFILE = gql`
  mutation updateMyProfile(
    $firstName: String!
    $lastName: String!
    $email: String!
    $profilePhoto: String!
  ) {
    UpdateMyProfile(
      firstName: $firstName
      lastName: $lastName
      email: $email
      profilePhoto: $profilePhoto
    ) {
      ok
      error
    }
  }
`;
