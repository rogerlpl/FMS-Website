import React, { PureComponent } from "react";
import CustomSkinMap from '../../components/Map/customSkinMap'
import Markers from '../../components/Map/markers'

// async function devicesList() {
//   const response = await fetch('http://localhost:58496/api/positions', {});
//   const devices = await response.json();

//   return devices;
// }


class Maps extends PureComponent {

  state = {
    googleReady: false,
    markers: [],
    devices:[
      { 'latitude': 18.474195, 'longitude': -69.9189654, 'id': 1 ,'name': 'prueba'},
      { 'latitude': 18.474195, 'longitude': -69.919518, 'id': 2 },
      { 'latitude': 18.474195, 'longitude': -69.914615, 'id': 3 },
    ],
  }

  componentDidMount=()=>{
    this.setState({ markersList: <Markers google={this.props.google} devices={this.state.devices} iconAddress={this.props.iconAddress} />})
  }
  componentDidUpdate = () => {
    if (this.props.google && !this.state.googleReady) {
      this.setState({ googleReady: true })
      this.setState({ markersList: <Markers google={this.props.google} devices={this.state.devices} iconAddress={this.props.iconAddress} /> })
    }
  }
  render() {
    return (
      <CustomSkinMap
        googleMapURL={"https://maps.googleapis.com/maps/api/js?key=AIzaSyAkm0weImm7VL1Mgk_ske45uxXCcfOUzrw&libraries=drawing"}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100vh`}} />}
        mapElement={<div style={{ height: `100%` }} />}
        devices={this.state.devices}
        iconAddress={this.props.iconAddress}
        google={this.props.google}
        markers={this.state.markersList}
        defaultCenter={this.props.defaultCenter}
      />
    );
  }
}

export default Maps;
