import React from "react";
import styled, { keyframes } from "../../typed-components";
import Helmet from "react-helmet";
import Sidebar from "react-sidebar";
import Menu from "../../Components/Menu";
import Button from "../../Components/Button";
import AddressBar from "../../Components/AddressBar";
import { userProfile, getRides } from "../../types/api";
import { MutationFn } from "react-apollo";
import RidePopUp from "../../Components/RidePopUp";

const Container = styled.div``;

const MenuButton = styled.button`
  appearance: none;
  padding: 10px;
  position: absolute;
  top: 10px;
  left: 10px;
  text-align: center;
  font-weight: 600;
  border: 0;
  cursor: pointer;
  font-size: 20px;
  transform: rotate(90deg);
  z-index: 2;
  background-color: transparent;
`;

const ExtendedButton = styled(Button)`
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 10;
  height: auto;
  width: 80%;
`;

const RequestButton = styled(ExtendedButton)`
  bottom: 100px;
`;

const Map = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const ModalAnimation = keyframes`
	  from{
	    opacity:0;
	    transform:scale(1.1);
	  }
	  to{
	    opacity:1;
	    transform:none;
	  }
  `;

const ModalContainer = styled.div`
  z-index: 8;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
`;

const ModalOverlay = styled.div`
  z-index: 5;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: ${props => props.theme.modalOverlayColor};
`;

const Modal = styled.div`
  top: 30%;
  width: 400px;
  @media screen and (max-width: 965px) {
    width: 90%;
  }
  z-index: 10;
  position: absolute;
  margin-top: 80px;
  animation: ${ModalAnimation} 0.1s linear;
`;

interface IProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  loading: boolean;
  mapRef: any;
  toAddress: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAddressSubmit: () => void;
  price?: number;
  data?: userProfile;
  requestRideFn?: MutationFn;
  nearbyRide?: getRides;
  acceptRideFn?: MutationFn;
  toggleModal: () => void;
  modalOpen: boolean;
  updateRideFn: MutationFn;
}

const HomePresenter: React.SFC<IProps> = ({
  isMenuOpen,
  toggleMenu,
  loading,
  mapRef,
  toAddress,
  onInputChange,
  onAddressSubmit,
  price,
  data: { GetMyProfile: { user = null } = {} } = {},
  nearbyRide: { GetNearbyRide: { ride = null } = {} } = {},
  requestRideFn,
  acceptRideFn,
  toggleModal,
  modalOpen,
  updateRideFn
}) => (
  <Container>
    <Helmet>
      <title>Home | Puber</title>
    </Helmet>
    <Sidebar
      sidebar={<Menu />}
      open={isMenuOpen}
      onSetOpen={toggleMenu}
      styles={{
        sidebar: {
          width: "80%",
          maxWidth: "600px",
          backgroundColor: "white",
          zIndex: "100"
        }
      }}
    >
      {!loading && <MenuButton onClick={toggleMenu}>|||</MenuButton>}
      {user && !user.isDriving && (
        <React.Fragment>
          <AddressBar
            name={"toAddress"}
            onChange={onInputChange}
            value={toAddress}
            onBlur={null}
          />
          <ExtendedButton
            onClick={onAddressSubmit}
            disabled={toAddress === ""}
            value={price === 0 ? "Change address" : "Pick Address"}
          />
        </React.Fragment>
      )}
      {price !== 0 && (
        <RequestButton
          onClick={requestRideFn}
          disabled={toAddress === ""}
          value={`Request Ride ($${price})`}
        />
      )}
      {user && user.isRiding && (
        <RequestButton
          onClick={() =>
            updateRideFn({
              variables: {
                rideId: user.id,
                status: "CANCELED"
              }
            })
          }
          value={"Cancel Ride"}
        />
      )}
      {ride && modalOpen && (
        <ModalContainer>
          <ModalOverlay onClick={toggleModal} />
          <Modal>
            <RidePopUp
              id={ride.id}
              pickUpAddress={ride.pickUpAddress}
              dropOffAddress={ride.dropOffAddress}
              price={ride.price}
              distance={ride.distance}
              passengerName={ride.passenger!.fullName!}
              passengerPhoto={ride.passenger!.profilePhoto!}
              acceptRideFn={acceptRideFn}
            />
          </Modal>
        </ModalContainer>
      )}
      <Map ref={mapRef} />
    </Sidebar>
  </Container>
);

export default HomePresenter;
