import React from "react";
import { getPlaces } from "../../types/api";
import Helmet from "react-helmet";
import styled from "src/typed-components";
import Header from "../../Components/Header/Header";
import { Link } from "react-router-dom";
import Place from "../../Components/Place";

const Container = styled.div`
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 200px;
`;

const SLink = styled(Link)`
  text-decoration: underline;
  margin-top: 20px;
`;

const Slim = styled.span`
  font-size: 10px;
  text-decoration: underline;
  margin-top: 20px;
`;
interface IProps {
  data?: getPlaces;
  loading: boolean;
}

const PlacesPresenter: React.SFC<IProps> = ({
  data: { GetMyPlaces: { places = null } = {} } = {},
  loading
}) => (
  <React.Fragment>
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
            id={place!.id}
            fav={place!.isFav}
            name={place!.name}
            address={place!.address}
            deletable={true}
          />
        ))}
      <Slim>
        <SLink to={"/add-place"}>Please add some places</SLink>
      </Slim>
    </Container>
  </React.Fragment>
);

export default PlacesPresenter;
