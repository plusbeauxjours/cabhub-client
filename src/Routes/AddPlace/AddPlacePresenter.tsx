import React from "react";
import { MutationFn } from "react-apollo";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import styled from "../../typed-components";

const Container = styled.div`
  margin-top: 200px;
  padding: 0 80px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 40px;
  text-align: center;
`;

const ExtendedLink = styled(Link)`
  text-decoration: underline;
  margin-bottom: 20px;
  display: block;
`;

const Slim = styled.span`
  font-size: 10px;
  text-decoration: underline;
  margin-top: 20px;
  text-align: center;
`;

interface IProps {
  address: string;
  name: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  onSubmit: MutationFn;
  pickedAddress: boolean;
}

const AddPlacePresenter: React.SFC<IProps> = ({
  address,
  name,
  onInputChange,
  loading,
  onSubmit,
  pickedAddress
}) => (
  <React.Fragment>
    <Helmet>
      <title>Add Place | Puber</title>
    </Helmet>
    <Header title={"Add Place"} backTo={"/"} />
    <Container>
      <Form submitFn={onSubmit}>
        <ExtendedInput
          placeholder={"Name"}
          type={"text"}
          onChange={onInputChange}
          value={name}
          name={"name"}
        />
        <ExtendedInput
          placeholder={"Address"}
          type={"text"}
          onChange={onInputChange}
          value={address}
          name={"address"}
          disabled={true}
        />
        <Slim>
          <ExtendedLink to={"/find-address"}>Pick place from map</ExtendedLink>
        </Slim>
        {pickedAddress && (
          <Button
            onClick={null}
            value={loading ? "Adding place" : "Add Place"}
          />
        )}
      </Form>
    </Container>
  </React.Fragment>
);

export default AddPlacePresenter;
