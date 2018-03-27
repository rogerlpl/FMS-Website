import React, { PureComponent } from "react";
import {GeofenceGreenSkinMap} from '../../components/Map/map-skins'
import {connect} from 'react-redux'

class GeofenceMap extends PureComponent {


  render() {
    return (
        <GeofenceGreenSkinMap
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `60vh`}}/>}
        mapElement={<div style={{ height: `100%` }} />}
        google={this.props.google}
        defaultCenter={this.props.defaultCenter}
      />
    );
  }
}

function mapStateToProps(state, props){
  return{
    google: state.get('mapData').get('google')
  }
}

export default connect(mapStateToProps)(GeofenceMap);
