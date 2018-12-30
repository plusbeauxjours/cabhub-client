import React from "react";
import styled from "styled-components";
import Input from "../../Components/Input/Input";
import Helmet from "react-helmet";
import Header from "../../Components/Header/Header";
import Form from "../../Components/Form/Form";
import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";

const Container = styled.div`
  padding: 0 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 40px;
`;

const ExtendedLink = styled(Link)`
  text-decoration: underline;
  margin-bottom: 20px;
  display: block;
`;

interface IProps {
  address: string;
  name: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
}

const AddPlacePresenter: React.SFC<IProps> = ({
  address,
  name,
  onInputChange,
  loading
}) => (
  <React.Component>
    <Helmet>
      <title>Add Place | Puber</title>
    </Helmet>
    <Header title={"Add Place"} backTo={"/"} />
    <Container>
      <Form submitFn={null}>
        <ExtendedInput
          placeholder={"Name"}
          type={"text"}
          onChange={onInputChange}
          value={name}
        />
        <ExtendedInput
          placeholder={"Address"}
          type={"text"}
          onChange={onInputChange}
          value={address}
        />
        <ExtendedLink to={"/find-address"}>Pick place from map</ExtendedLink>
        <Button onClick={null} value={loading ? "Adding place" : "AdPlace"} />
      </Form>
    </Container>
  </React.Component>
);

export default AddPlacePresenter;
