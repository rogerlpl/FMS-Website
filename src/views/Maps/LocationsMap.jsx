import React, { PureComponent } from "react";
import { GreenSkinMap } from '../../components/Map/map-skins'
import Markers from '../../components/Map/markers'

// async function devicesList() {
//   const response = await fetch('http://localhost:58496/api/positions', {});
//   const devices = await response.json();

//   return devices;
// }


class LocationsMap extends PureComponent {

  state = {
    googleReady: false,
    markers: [],
    devices: [
      { 'latitude': 18.474195, 'longitude': -69.9189654, 'id': 1, 'name': 'prueba' },
      { 'latitude': 18.474195, 'longitude': -69.919518, 'id': 2 },
      { 'latitude': 18.474195, 'longitude': -69.914615, 'id': 3 },
    ],
  }

  componentDidMount = () => {
    this.setState({ markersList: <Markers _onClick={this.props.handleOpenModal} google={this.props.google} devices={this.state.devices} iconAddress={this.props.iconAddress} /> })
  }
  componentDidUpdate = () => {
    if (this.props.google && !this.state.googleReady) {
      this.setState({ googleReady: true })
      this.setState({ markersList: <Markers _onClick={this.props.handleOpenModal} google={this.props.google} devices={this.state.devices} iconAddress={this.props.iconAddress} /> })
    }
  }
  render() {
    if (this.props.google) {
      return (
        <GreenSkinMap
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          devices={this.state.devices}
          iconAddress={this.props.iconAddress}
          google={this.props.google}
          markers={this.state.markersList}
          defaultCenter={this.props.defaultCenter}
        />
      );
    } 
    return 'No ha cargado google'
      
    
  }
}

export default LocationsMap;
