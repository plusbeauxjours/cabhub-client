import React from "react";
import FindAddressPresenter from "./FindAddressPresenter";
import ReactDOM from "react-dom";

class FindAddressContainer extends React.Component<any> {
  public mapRef: any;
  public map: google.maps.Map;
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }
  public componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSucces,
      this.handleGeoError
    );
  }
  public render() {
    return <FindAddressPresenter mapRef={this.mapRef} />;
  }
  public handleGeoSucces = (position: Position) => {
    const {
      coords: { latitude, longitude }
    } = position;
    console.log(position);
    this.loadMap(latitude, longitude);
  };
  public handleGeoError = () => {
    console.log("No location");
  };
  public loadMap = (lat, lng) => {
    const { google } = this.props;
    const maps = google.maps;
    const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
    const mapConfig: google.maps.MapOptions = {
      center: {
        lat,
        lng
      },
      disableDefaultUI: true,
      zoom: 11
    };
    this.map = new maps.Map(mapNode, mapConfig);
  };
}

export default FindAddressContainer;
