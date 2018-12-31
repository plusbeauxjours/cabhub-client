import React from "react";
import styled from "../../typed-components";
import { MutationFn } from "react-apollo";

const Container = styled.div`
  margin-left: 10px;
`;

const Place = styled.div`
  margin: 15px 0;
  display: flex;
  align-items: center;
  &i {
    font-size: 12px;
  }
`;

const Icon = styled.span`
  cursor: pointer;
`;

const Name = styled.span`
  display: block;
`;

const Address = styled.span`
  color: ${props => props.theme.greyColor};
  font-size: 14px;
`;

interface IProps {
  fav: boolean;
  name: string;
  address: string;
  onstarPress: MutationFn;
}

const PlacePresenter: React.SFC<IProps> = ({
  fav,
  name,
  address,
  onstarPress
}) => (
  <Place>
    <Icon onClick={onstarPress as any}>{fav ? "★" : "✩"} </Icon>
    <Container>
      <Name>{name}</Name>
      <Address>{address}</Address>
    </Container>
  </Place>
);

export default PlacePresenter;
