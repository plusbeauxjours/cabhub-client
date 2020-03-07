import { gql } from "apollo-boost";

export const USER_PROFILE = gql`
  query userProfile {
    GetMyProfile {
      ok
      error
      user {
        id
        profilePhoto
        firstName
        lastName
        email
        fullName
        isDriving
        isRiding
      }
    }
  }
`;

export const GET_PLACES = gql`
  query getPlaces {
    GetMyPlaces {
      ok
      error
      places {
        id
        name
        address
        lat
        lng
        isFav
      }
    }
  }
`;

export const GET_MY_RIDES = gql`
  query getMyRides {
    GetMyRides {
      ok
      error
      rides {
        id
        status
        pickUpAddress
        dropOffAddress
        price
        distance
        duration
        driver {
          id
          fullName
          profilePhoto
        }
        driverId
        passenger {
          id
          fullName
          profilePhoto
        }
        passengerId
        chatId
        createdAt
      }
    }
  }
`;
