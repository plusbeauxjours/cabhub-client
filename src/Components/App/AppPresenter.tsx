import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import OutHome from "../Route/OutHome";
import PhoneLogin from "../Route/PhoneLogin";
import VerifyPhone from "../Route/VerifyPhone";
import SocialLogin from "../Route/SocialLogin";
import Home from "../Route/Home";
import Ride from "../Route/Ride";
import EditAccount from "../Route/EditAccount";
import Settings from "../Route/Settings";
import Places from "../Route/Places";
import AddPlace from "../Route/AddPlace";
import FindAddress from "../Route/FindAddress";

interface IProps {
  isLoggedIn: boolean;
}

const AppPresenter: React.SFC<IProps> = ({ isLoggedIn }) => (
  <BrowserRouter>
    {isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}
  </BrowserRouter>
);

const LoggedOutRoutes: React.SFC = () => (
  <Switch>
    <Route path={"/"} exact={true} component={OutHome} />
    <Route path={"/phone-login"} component={PhoneLogin} />
    <Route path={"/verify-phone/:number"} component={VerifyPhone} />
    <Route path={"/social-logn"} component={SocialLogin} />
    <Redirect from={"*"} to={"/"} />
  </Switch>
);

const LoggedInRoutes: React.SFC = () => (
  <Switch>
    <Route path={"/"} exact={true} component={Home} />
    <Route path={"/ride"} component={Ride} />
    <Route path={"/edit-account"} component={EditAccount} />
    <Route path={"/settings"} component={Settings} />
    <Route path={"/places"} component={Places} />
    <Route path={"/add-place"} component={AddPlace} />
    <Route path={"/find-address"} component={FindAddress} />
    <Redirect from={"*"} to={"/"} />
  </Switch>
);

export default AppPresenter;
