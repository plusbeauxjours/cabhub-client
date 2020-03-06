import React from "react";
import { userProfile, getPlaces } from "../../types/api";
import { MutationFn } from "react-apollo";
import styled from "src/typed-components";
import Helmet from "react-helmet";
import Header from "../../Components/Header/index";
import { Link } from "react-router-dom";
import Place from "../../Components/Place";
import Loader from "../../Components/Loader";

const Container = styled.div`
  display: flex;
  margin-top: 150px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 40px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const Image = styled.label`
  cursor: pointer;
  height: 150px;
  width: 150px;
  border: 1px solid black;
  display: block;
  border-radius: 50%;
  margin-bottom: 35px;
  font-size: 28px;
  overflow: hidden;
  & img {
    width: 150px;
    height: 150px;
  }
`;

const Keys = styled.div`
  text-align: center;
`;

const Bold = styled.span`
  font-size: 24px;
  font-weight: 600;
`;

const Slim = styled.span`
  font-size: 10px;
  text-decoration: underline;
  margin-bottom: 20px;
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
}) => {
  if (userDataLoading || placesLoading) {
    return <Loader />;
  } else {
    return (
      <React.Fragment>
        <Helmet>
          <title>Settings | Puber</title>
        </Helmet>
        <Header title={"Account Settings"} backTo={"/"} />
        <Container>
          {!userDataLoading && user && (
            <Box>
              <Image src={user.profilePhoto} />
              <Keys>
                <Bold>{user.fullName}</Bold>
                <Key>{user.email}</Key>
                <Slim>
                  <Link to={"/edit-account"}>Edit Profile</Link>
                </Slim>
              </Keys>
            </Box>
          )}
          {!placesLoading &&
            places &&
            places.map(place => (
              <Place
                key={place!.id}
                id={place!.id}
                fav={place!.isFav}
                name={place!.name}
                address={place!.address}
              />
            ))}
          <Slim>
            <Link to={"/places"}>Go to Places</Link>
          </Slim>
          <Slim>
            <FakeLink onClick={logUserOut as any}>Log Out</FakeLink>
          </Slim>
        </Container>
      </React.Fragment>
    );
  }
};

export default SettingsPresenter;
