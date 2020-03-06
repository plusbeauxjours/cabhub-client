import React from "react";
import { MutationFn } from "react-apollo";
import styled from "../../typed-components";

const Place = styled.div`
  margin: 15px 0;
  display: flex;
  align-items: center;
  & i {
    font-size: 12px;
  }
`;

const Container = styled.div`
  margin-left: 10px;
`;

const Name = styled.span`
  display: block;
  text-align: center;
`;

const Icon = styled.span`
  cursor: pointer;
  margin-right: 5px;
`;

const Slim = styled.span`
  font-size: 10px;
  text-decoration: underline;
  margin-left: 20px;
  cursor: pointer;
`;

const Address = styled.span`
  color: ${props => props.theme.greyColor};
  font-size: 14px;
`;

interface IProps {
  fav: boolean;
  name: string;
  address: string;
  editPlaceFn: MutationFn;
  deletePlaceFn: MutationFn;
  deletable?: boolean;
}

const PlacePresenter: React.SFC<IProps> = ({
  editPlaceFn,
  deletePlaceFn,
  fav,
  name,
  address,
  deletable
}) => (
  <Place>
    <Container>
      <Name>
        <Icon onClick={editPlaceFn as any}>{fav ? "★" : "✩"}</Icon>
        {name}
      </Name>
      <Address>{address}</Address>
      {deletable && <Slim onClick={deletePlaceFn as any}>Delete Place</Slim>}
    </Container>
  </Place>
);

export default PlacePresenter;
