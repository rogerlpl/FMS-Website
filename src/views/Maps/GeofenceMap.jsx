import React, { PureComponent } from "react";
import CustomSkinMap from '../../components/Map/customSkinMap'

class GeofenceMap extends PureComponent {

  state = {
    googleReady: false,
  }

  render() {
    return (
      <CustomSkinMap
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `60vh`}}/>}
        mapElement={<div style={{ height: `100%` }} />}
        google={this.props.google}
        defaultCenter={this.props.defaultCenter}
      />
    );
  }
}

export default GeofenceMap;
