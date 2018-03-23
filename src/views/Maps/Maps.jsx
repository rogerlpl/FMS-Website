import React, { PureComponent } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const CustomSkinMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={7}
      defaultCenter={{ lat: 18.555353, lng: -70.8627778 }}
      defaultOptions={{
        streetViewControl: false,
        scrollwheel: true,
        zoomControl: false,
        styles: [
          {
            featureType: "water",
            stylers: [
              { saturation: 43 },
              { lightness: -11 },
              { hue: "#0088ff" }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
              { hue: "#ff0000" },
              { saturation: -100 },
              { lightness: 99 }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#808080" }, { lightness: 54 }]
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [{ color: "#ece2d9" }]
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [{ color: "#ccdca1" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#767676" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#ffffff" }]
          },
          { featureType: "poi", stylers: [{ visibility: "off" }] },
          {
            featureType: "landscape.natural",
            elementType: "geometry.fill",
            stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
          },
          { featureType: "poi.park", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.sports_complex",
            stylers: [{ visibility: "on" }]
          },
          { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.business",
            stylers: [{ visibility: "simplified" }]
          }
        ]
      }}
    >
      {props.markers}
    </GoogleMap>
  ))
);

async function devicesList() {
  const response = await fetch('http://localhost:58496/api/positions', {});
  const devices = await response.json();

  return devices;
}

 const  markers = (google,devices,iconAddress) => {

  if (google) {
    return devices.map(device => (
      <Marker
        position={{ lat: device.latitude, lng: device.longitude }}
        key={device.id}
        defaultIcon={{
          url: iconAddress, // url
          scaledSize: new google.maps.Size(30, 30), // scaled size
        }} 
        defaultAnimation={1}
         title={device.name}
        />
    ))
  }
}

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
    this.setState({ markersList: markers(this.props.google,this.state.devices,this.props.iconAddress) })
  }
  componentDidUpdate = () => {
    if (this.props.google && !this.state.googleReady) {
      this.setState({ googleReady: true })
      this.setState({ markersList: markers(this.props.google,this.state.devices,this.props.iconAddress) })
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
      />
    );
  }
}

export default Maps;
