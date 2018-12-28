import React from "react";
import EditAccountPresenter from "./EditAccountPresenter";
import { Mutation } from "react-apollo";
import { updateMyProfile, updateMyProfileVariables } from "../../types/api";
import { UPDATE_PROFILE } from "./EditAccountQueries";
import { RouteComponentProps } from "react-router";

interface IState {
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: string;
}

interface IProps extends RouteComponentProps<any> {}

class UpdateProfileMutation extends Mutation<
  updateMyProfile,
  updateMyProfileVariables
> {}

class EditAccountContainer extends React.Component<IProps, IState> {
  public state = {
    firstName: "",
    lastName: "",
    email: "",
    profilePhoto: ""
  };
  public render() {
    const { firstName, lastName, email, profilePhoto } = this.state;
    return (
      <UpdateProfileMutation
        mutation={UPDATE_PROFILE}
        variables={{
          firstName,
          lastName,
          email,
          profilePhoto
        }}
      >
        {(updateProfileFn, { loading }) => (
          <EditAccountPresenter
            firstName={firstName}
            lastName={lastName}
            email={email}
            profilePhoto={profilePhoto}
            onInputChange={this.onInputChange}
            loading={loading}
            onSubmit={updateProfileFn}
          />
        )}
      </UpdateProfileMutation>
    );
  }
  public onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { name, value }
    } = event;

    this.setState({
      [name]: value
    } as any);
  };
}

export default EditAccountContainer;
