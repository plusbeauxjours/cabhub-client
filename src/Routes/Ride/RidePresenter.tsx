import React from "react";
import styled from "src/typed-components";
import { getRide } from "../../types/api";

const Container = styled.div``;

interface IProps {
  data?: getRide;
}

const RidePresenter: React.SFC<IProps> = () => (
  <Container>RidePresenter</Container>
);

export default RidePresenter;
