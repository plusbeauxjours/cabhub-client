import React from "react";
import { userProfile } from "../../types/api";
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
  logUserOut?: MutationFn;
}

const SettingsPresenter: React.SFC<IProps> = ({
  userDataLoading,
  userData: { GetMyProfile: { user = null } = {} } = {},
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
      <Place fav={false} name={"Home"} address={"12345"} />
      <Place fav={false} name={"Home"} address={"12345"} />
      <Place fav={false} name={"Home"} address={"12345"} />
      <SLink to={"places"}>Go to Places</SLink>
      <FakeLink onClick={logUserOut as any}>Log Out</FakeLink>
    </Container>
  </React.Fragment>
);

export default SettingsPresenter;
