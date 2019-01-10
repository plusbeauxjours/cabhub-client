import React from "react";
import Header from "../../Components/Header/index";
import styled from "src/typed-components";

const Container = styled.div``;

const ChatPresenter: React.SFC = () => (
  <Container>
    <Header title={"Chat"} />
  </Container>
);

export default ChatPresenter;
