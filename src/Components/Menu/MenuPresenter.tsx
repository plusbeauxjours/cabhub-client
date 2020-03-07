import React from "react";
import { MutationFn } from "react-apollo";
import { Link } from "react-router-dom";
import styled from "../../typed-components";
import { toggleDriving, userProfile, getMyRides } from "../../types/api";
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

const RideContainer = styled.div`
  display: flex;
  padding: 10px;
  margin-bottom: 5px;
  align-items: center;
`;

const RideRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const AddressRow = styled.div<ITheme>`
  display: flex;
  flex-direction: row;
  color: ${props => {
    if (props.status === "FINISHED") {
      return "#cdcccc";
    } else {
      return null;
    }
  }};
`;
const AddressBold = styled.p`
  font-size: 6px;
  font-weight: 600;
  margin-right: 10px;
  width: 30px;
`;

const AddressText = styled.p`
  font-size: 6px;
`;
const StatusText = styled.p<ITheme>`
  font-size: 15px;
  font-weight: 600;
  margin-left: 5px;
  color: ${props => {
    if (props.status === "ACCEPTED") {
      return "#283694";
    } else if (props.status === "FINISHED") {
      return "#cdcccc";
    } else if (props.status === "CANCELED") {
      return "#cc0033";
    } else if (props.status === "REQUESTING") {
      return "#007239";
    } else {
      return "#baa34d";
    }
  }};
`;
const StatusContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 150px;
`;
const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const DistanceText = styled.p<ITheme>`
  font-size: 15px;
  margin-left: 5px;
  color: ${props => {
    if (props.status === "FINISHED") {
      return "#cdcccc";
    } else {
      return null;
    }
  }};
`;
interface ITheme {
  status: string;
}
interface IProps {
  data?: userProfile;
  loading: boolean;
  ridesData?: getMyRides;
  ridesLoading: boolean;
  toggleDrivingFn: MutationFn<toggleDriving>;
}

const MenuPresenter: React.SFC<IProps> = ({
  data: { GetMyProfile: { user = null } = {} } = {},
  loading,
  ridesData: { GetMyRides: { rides = null } = {} } = {},
  ridesLoading,
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
        {!ridesLoading &&
          rides &&
          rides.length !== 0 &&
          rides.map(ride => (
            <Link to={`/ride/${ride.id}`}>
              <RideContainer key={ride.id}>
                <RideRow>
                  <AddressContainer>
                    <AddressRow status={ride.status}>
                      <AddressBold>From:</AddressBold>
                      <AddressText> {ride.pickUpAddress}</AddressText>
                    </AddressRow>
                    <AddressRow status={ride.status}>
                      <AddressBold>To:</AddressBold>
                      <AddressText> {ride.dropOffAddress}</AddressText>
                    </AddressRow>
                  </AddressContainer>
                  <StatusContainer>
                    <DistanceText status={ride.status}>
                      {ride.distance}
                    </DistanceText>
                    <StatusText status={ride.status}>{ride.status}</StatusText>
                  </StatusContainer>
                </RideRow>
              </RideContainer>
            </Link>
          ))}
      </React.Fragment>
    )}
  </Container>
);

export default MenuPresenter;
