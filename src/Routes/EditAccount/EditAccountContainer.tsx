import React from "react";
import EditAccountPresenter from "./EditAccountPresenter";
import { Mutation, Query } from "react-apollo";
import {
  updateMyProfile,
  updateMyProfileVariables,
  userProfile
} from "../../types/api";
import { UPDATE_PROFILE } from "./EditAccountQueries";
import { RouteComponentProps } from "react-router";
import { USER_PROFILE } from "../../sharedQueries";
import { toast } from "react-toastify";

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

class ProfileQuery extends Query<userProfile> {}

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
      <ProfileQuery query={USER_PROFILE} onCompleted={this.updateFields}>
        {() => (
          <UpdateProfileMutation
            mutation={UPDATE_PROFILE}
            variables={{
              firstName,
              lastName,
              email,
              profilePhoto
            }}
            refetchQueries={[{ query: USER_PROFILE }]}
            onCompleted={data => {
              const { UpdateMyProfile } = data;
              if (UpdateMyProfile.ok) {
                toast.success("Profile updated!");
              } else if (UpdateMyProfile.error) {
                toast.error(UpdateMyProfile.error);
              }
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
        )}
      </ProfileQuery>
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

  public updateFields = (data: {} | userProfile) => {
    console.log(data);
    if ("GetMyProfile" in data) {
      const {
        GetMyProfile: { user }
      } = data;
      if (user !== null) {
        const { firstName, lastName, email, profilePhoto } = user;
        this.setState({
          firstName,
          lastName,
          email,
          profilePhoto
        } as any);
      }
    }
  };
}

export default EditAccountContainer;
