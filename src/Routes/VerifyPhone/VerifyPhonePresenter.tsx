import React from "react";
import styled from "../../typed-components";
import Helmet from "react-helmet";
import Header from "../../Components/Header/Header";
import Input from "../../Components/Input";
import Button from "../../Components/Button/index";
import { MutationFn } from "react-apollo";
import Form from "src/Components/Form";

const Container = styled.div``;

const ExtendedForm = styled(Form)`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 20px;
`;

interface IProps {
  verificationKey: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: MutationFn;
  loading: boolean;
}

const VerifyPhonePresenter: React.SFC<IProps> = ({
  verificationKey,
  onChange,
  onSubmit,
  loading
}) => (
  <Container>
    <Helmet>
      <title>Verify Phone | Puber</title>
    </Helmet>
    <Header backTo={"/phone-login"} title={"Verify Phone Number"} />
    <ExtendedForm submitFn={onSubmit}>
      <ExtendedInput
        value={verificationKey}
        placeholder={"Enter Verification Code"}
        onChange={onChange}
        name={"verificationKey"}
      />
      <Button
        value={loading ? "Verifying" : "Submit"}
        onClick={null}
        disabled={loading}
      />
    </ExtendedForm>
  </Container>
);

export default VerifyPhonePresenter;
