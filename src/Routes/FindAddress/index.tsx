import FindAddressContainer from "./FindAddressContainer";
import { GoogleApiWrapper } from "google-maps-react";
import { GOOGLE_MAPS_KEY } from "../../keys";

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_KEY
})(FindAddressContainer);
