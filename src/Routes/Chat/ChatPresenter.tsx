import React from "react";
import Header from "../../Components/Header/index";
import styled from "../../typed-components";
import { getChat, userProfile } from "../../types/api";
import Message from "../../Components/Message";

interface IProps {
  loading: boolean;
  data?: getChat;
  userData?: userProfile;
}

const Container = styled.div``;

const ChatPresenter: React.SFC<IProps> = ({
  loading,
  data: { GetChat: { chat = null } = {} } = {},
  userData: { GetMyProfile: { user = null } = {} } = {}
}) => (
  <Container>
    <Header title={"Chat"} />
    {!loading && chat && user && (
      <React.Fragment>
        {chat.messages &&
          chat.messages.map(message => {
            if (message) {
              return (
                <Message
                  key={message.id}
                  text={message.text}
                  mine={user.id === message.userId}
                />
              );
            }
            return null;
          })}
      </React.Fragment>
    )}
  </Container>
);

export default ChatPresenter;
