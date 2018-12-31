import React from "react";
import { getPlaces } from "../../types/api";
import Helmet from "react-helmet";
import styled from "src/typed-components";
import Header from "../../Components/Header/Header";
import { Link } from "react-router-dom";
import Place from "../../Components/Place/index";

const Container = styled.div`
  padding: 0 40px;
`;

const SLink = styled(Link)`
  text-decoration: underline;
`;

interface IProps {
  data?: getPlaces;
  loading: boolean;
}

const PlacesPresenter: React.SFC<IProps> = ({
  data: { GetMyPlaces: { places = null } = {} } = {},
  loading
}) => (
  <React.Component>
    <Helmet>
      <title>Places | Puber</title>
    </Helmet>
    <Header title={"Places"} backTo={"/"} />
    <Container>
      {!loading && places && places.length === 0 && "You have no places"}
      {!loading &&
        places &&
        places.map(place => (
          <Place
            key={place!.id}
            fav={place!.isFav}
            name={place!.name}
            address={place!.address}
          />
        ))}
      <SLink to={"/add-place"}>Please add some places</SLink>
    </Container>
  </React.Component>
);

export default PlacesPresenter;
