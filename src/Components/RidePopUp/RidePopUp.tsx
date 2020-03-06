import React from "react";
import styled from "../../typed-components";
import Button from "../Button";

const Container = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 9;
  max-width: 600px;
  height: 800px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h4`
  font-weight: 800;
  margin-top: 30px;
  margin-bottom: 10px;
  &:first-child {
    margin-top: 0;
  }
`;

const Data = styled.span`
  color: ${props => props.theme.blueColor};
`;

const Passenger = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Img = styled.img`
  border-radius: 50%;
  max-width: 50px;
  height: 50px;
  margin-bottom: 10px;
`;

interface IProps {
  pickUpAddress: string;
  dropOffAddress: string;
  price: number;
  distance: string;
  passengerName?: string;
  passengerPhoto?: string;
  acceptRideFn: any;
  id: number;
}

const RidePopUp: React.SFC<IProps> = ({
  pickUpAddress,
  dropOffAddress,
  price,
  distance,
  passengerName,
  passengerPhoto,
  acceptRideFn,
  id
}) => (
  <Container>
    <Title>Pick Up Address</Title>
    <Data>{pickUpAddress}</Data>
    <Title>Drop Off Address</Title>
    <Data>{dropOffAddress}</Data>
    <Title>Price</Title>
    <Data>{price.toFixed(2)}</Data>
    <Title>Distance</Title>
    <Data>{distance}</Data>
    <Title>Passenger:</Title>
    <Passenger>
      <Img src={passengerPhoto} />
      <Data>{passengerName}</Data>
    </Passenger>
    <Button
      onClick={() => {
        acceptRideFn({ variables: { rideId: id } }), console.log("id", id);
      }}
      value={"Accept Ride"}
    />
  </Container>
);

export default RidePopUp;
