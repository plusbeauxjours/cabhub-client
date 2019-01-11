import React from "react";
import { RouteComponentProps } from "react-router";
import ChatPresenter from "./ChatPresenter";
import { Query } from "react-apollo";
import { userProfile } from "src/types/api";
import { getChat, getChatVariables } from "../../types/api";
import { USER_PROFILE } from "../../sharedQueries";
import { GET_CHAT } from "./ChatQueries";

interface IProps extends RouteComponentProps<any> {}

class ProfileQuery extends Query<userProfile> {}
class ChatQuery extends Query<getChat, getChatVariables> {}

class ChatContainer extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    if (!props.match.params.chatId) {
      props.history.push("/");
    }
  }
  public render() {
    const {
      match: {
        params: { chatId }
      }
    } = this.props;
    return (
      <ProfileQuery query={USER_PROFILE}>
        {({ data: userData }) => (
          <ChatQuery query={GET_CHAT}>
            {({ data, loading }) => (
              <ChatPresenter
                data={data}
                loading={loading}
                userData={userData}
              />
            )}
          </ChatQuery>
        )}
      </ProfileQuery>
    );
  }
}

export default ChatContainer;
