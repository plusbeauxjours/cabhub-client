import React from "react";
import Header from "../../Components/Header/index";
import styled from "../../typed-components";
import { getChat, userProfile } from "../../types/api";
import Message from "../../Components/Message";
import Form from "src/Components/Form";
import Input from "../../Components/Input/Input";

interface IProps {
  loading: boolean;
  data?: getChat;
  userData?: userProfile;
  messageText: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const Container = styled.div``;

const Chat = styled.div`
  height: 80vh;
  overflow: scroll;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const InputCont = styled.div`
  padding: 0 20px;
`;

const ChatPresenter: React.SFC<IProps> = ({
  loading,
  data: { GetChat: { chat = null } = {} } = {},
  userData: { GetMyProfile: { user = null } = {} } = {},
  messageText,
  onInputChange,
  onSubmit
}) => (
  <Container>
    <Header title={"Chat"} />
    {!loading && chat && user && (
      <React.Fragment>
        <Chat>
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
        </Chat>
        <InputCont>
          <Form submitFn={onSubmit}>
            <Input
              value={messageText}
              placeHolder={"Type your message"}
              onChange={onInputChange}
              name={"message"}
            />
          </Form>
        </InputCont>
      </React.Fragment>
    )}
  </Container>
);

export default ChatPresenter;
