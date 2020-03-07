import React from "react";
import Header from "../../Components/Header/index";
import styled from "../../typed-components";
import Message from "../../Components/Message";
import Form from "src/Components/Form";
import Input from "../../Components/Input/Input";

interface IProps {
  loading: boolean;
  chatData?: any;
  userData?: any;
  messageText: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const Container = styled.div``;

const MessageList = styled.ol`
  height: 80vh;
  overflow: scroll;
  padding: 0 0.12rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  li + li {
    margin-top: 0.3rem;
  }
`;

const InputCont = styled.div`
  padding: 0 20px;
`;

const ChatPresenter: React.SFC<IProps> = ({
  loading,
  chatData: { GetChat: { chat = null } = {} } = {},
  userData: { GetMyProfile: { user = null } = {} } = {},
  messageText,
  onInputChange,
  onSubmit
}) => (
  <Container>
    <Header title={"Chat"} backTo={"/"} />
    {!loading && chat && user && (
      <React.Fragment>
        <MessageList>
          {user &&
            chat &&
            chat.messages &&
            chat.messages!.map(message => {
              if (message) {
                return (
                  <Message
                    key={message.id}
                    text={message.text}
                    mine={user.id === message.userId}
                  />
                );
              }
              return false;
            })}
        </MessageList>

        <InputCont>
          <Form submitFn={onSubmit}>
            <Input
              value={messageText}
              placeholder={"Type your message"}
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
