import React, { PureComponent } from "react";
import CustomSkinMap from '../../components/Map/customSkinMap'

class GeofenceMap extends PureComponent {

  state = {
    googleReady: false,
  }

  render() {
    return (
      <CustomSkinMap
        googleMapURL={"https://maps.googleapis.com/maps/api/js?key=AIzaSyAkm0weImm7VL1Mgk_ske45uxXCcfOUzrw&libraries=drawing"}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `60vh`}}/>}
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

export default GeofenceMap;
