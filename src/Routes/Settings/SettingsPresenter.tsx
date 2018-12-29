import React from "react";
import { userProfile, getPlaces } from "../../types/api";
import { MutationFn } from "react-apollo";
import styled from "src/typed-components";
import Helmet from "react-helmet";
import Header from "../../Components/Header/index";
import { Link } from "react-router-dom";
import Place from "../../Components/Place/index";

const Container = styled.div`
  padding: 0px 40px;
`;

const GridLink = styled(Link)`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 10px;
  margin-bottom: 10px;
  align-items: center;
`;

const Image = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
`;

const Keys = styled.div``;

const SLink = styled(Link)`
  display: block;
  text-decoration: underline;
  margin: 20px 0px;
`;

const Key = styled.span`
  display: block;
  margin-bottom: 5px;
`;

const FakeLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

interface IProps {
  userDataLoading: boolean;
  userData?: userProfile;
  placesLoading: boolean;
  placesData?: getPlaces;
  logUserOut?: MutationFn;
}

const SettingsPresenter: React.SFC<IProps> = ({
  userDataLoading,
  userData: { GetMyProfile: { user = null } = {} } = {},
  placesLoading,
  placesData: { GetMyPlaces: { places = null } = {} } = {},
  logUserOut
}) => (
  <React.Fragment>
    <Helmet>
      <title>Settings | Puber</title>
    </Helmet>
    <Header title="Account Settings" backTo={"/"} />
    <Container>
      <GridLink to={"/edit-acount"}>
        {!userDataLoading &&
          user &&
          user.profilePhoto &&
          user.email &&
          user.fullName && (
            <React.Fragment>
              <Image src={user.profilePhoto} />
              <Keys>
                <Key>{user.fullName}</Key>
                <Key>{user.email}</Key>
              </Keys>
            </React.Fragment>
          )}
      </GridLink>
      {!placesLoading &&
        places &&
        places.map(place => (
          <Place
            key={place!.id}
            fav={place!.isFav}
            name={place!.name}
            address={place!.address}
          />
        ))}
      <SLink to={"/places"}>Go to Places</SLink>
      <FakeLink onClick={logUserOut as any}>Log Out</FakeLink>
    </Container>
  </React.Fragment>
);

export default SettingsPresenter;
