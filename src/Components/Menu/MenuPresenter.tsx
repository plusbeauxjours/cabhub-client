import React from "react";
import { MutationFn } from "react-apollo";
import { Link } from "react-router-dom";
import styled from "../../typed-components";
import { toggleDriving, userProfile } from "../../types/api";
import { Gear } from "src/icons";

const Container = styled.div`
  height: 100%;
  max-width: 600px;
`;

const Header = styled.div`
  background-color: black;
  height: 400px;
  padding: 0 15px;
  color: white;
`;

const SLink = styled(Link)`
  font-size: 22px;
  display: block;
  margin-left: 15px;
  margin-bottom: 25px;
  font-weight: 400;
`;

const Image = styled.img`
  height: 150px;
  width: 150px;
  margin-bottom: 30px;
  margin-top: 100px;
  background-color: transparent;
  border: 1px solid grey;
  border-radius: 75px;
  overflow: hidden;
`;

const Name = styled.h2`
  font-size: 22px;
  color: white;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Text = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface IToggleProps {
  isDriving: boolean;
}

const ToggleDriving = styled<IToggleProps, any>("button")`
  -webkit-appearance: none;
  background-color: ${props =>
    props.isDriving ? props.theme.yellowColor : props.theme.greenColor};
  width: 100%;
  color: white;
  font-size: 18px;
  border: 0;
  padding: 15px 0px;
  cursor: pointer;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Icon = styled.span`
  svg {
    fill: gray;
  }
`;

interface IProps {
  data?: userProfile;
  loading: boolean;
  toggleDrivingFn: MutationFn<toggleDriving>;
}

const MenuPresenter: React.SFC<IProps> = ({
  data: { GetMyProfile: { user = null } = {} } = {},
  loading,
  toggleDrivingFn
}) => (
  <Container>
    {!loading && user && user.fullName && (
      <React.Fragment>
        <Header>
          <Box>
            <Link to={"/edit-account"}>
              <Image src={user.profilePhoto || "+"} />
            </Link>
            <NameContainer>
              <Text>
                <Name>{user.fullName}</Name>
              </Text>
              <SLink to="/settings">
                <Icon>
                  <Gear />
                </Icon>
              </SLink>
            </NameContainer>
          </Box>
        </Header>
        <ToggleDriving onClick={toggleDrivingFn} isDriving={user.isDriving}>
          {user.isDriving ? "Stop driving" : "Start driving"}
        </ToggleDriving>
      </React.Fragment>
    )}
  </Container>
);

export default MenuPresenter;
