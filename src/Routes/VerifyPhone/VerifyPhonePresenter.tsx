import React from "react";
import styled from "src/typed-components";
import Helmet from "react-helmet";
import Header from "../../Components/Header/Header";
import Input from "src/Components/Input";
import Button from "../../Components/Button/index";

const Container = styled.div``;

const Form = styled.form`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 20px;
`;

const VerifyPhonePresenter = () => (
  <Container>
    <Helmet>
      <title>Verify Phone | Puber</title>
    </Helmet>
    <Header backTo={"/phone-login"} title={"Verify Phone Number"} />
    <Form>
      <ExtendedInput
        value={""}
        placeholder={"Enter Verification Code"}
        onChange={null}
      />
      <Button value={"Submit"} onClick={null} />
    </Form>
  </Container>
);

export default VerifyPhonePresenter;
