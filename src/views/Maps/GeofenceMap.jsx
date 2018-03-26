import React, { PureComponent } from "react";
import {GreenSkinMap} from '../../components/Map/map-skins'

class GeofenceMap extends PureComponent {

  state = {
    googleReady: false,
  }

  render() {
    return (
        <GreenSkinMap
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
