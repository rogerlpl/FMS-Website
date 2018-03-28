import React, { PureComponent } from "react";
import {GeofenceGreenSkinMap} from '../../components/Map/map-skins'
import {connect} from 'react-redux'
import * as actions from '../../actions/actions-creators'
import {bindActionCreators} from 'redux'

class GeofenceMap extends PureComponent {

  handleOverlayComplete =(e) =>{
    this.props.actions.isDrawingGeofences()
    this.props.actions.drewGeofences(e)
    e.overlay.setEditable(true)
    e.overlay.setDraggable(true)
    this.handleOnPolygonComplete(e)
  }
  handleOnPolygonComplete =(e) =>{
            const polygonBounds = e.overlay.getPath()
            let coordinates = [];

            for (let i = 0; i < polygonBounds.length; i++)
            {
                coordinates.push({lat:polygonBounds.getAt(i).lat(), lng:polygonBounds.getAt(i).lng()});
            } 
            console.log(coordinates);
  }
  render() {
    return (
        <GeofenceGreenSkinMap
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `60vh`}}/>}
        mapElement={<div style={{ height: `100%` }} />}
        google={this.props.google}
        defaultCenter={this.props.defaultCenter}
        isDrawingGeofences={this.props.isDrawingGeofences}
        handleOverlayComplete={this.handleOverlayComplete}
      />
    );
  }
}

function mapStateToProps(state, props){
  return{
    google: state.get('mapData').get('google'),
    isDrawingGeofences: state.getIn(['modal','geofencesMap','isDrawingGeofences']),
    drewGeofences: state.getIn(['modal','geofencesMap','drewGeofences'])
  }
}
function mapDispatchToProps(dispatch){
  return{
    actions: bindActionCreators(actions,dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(GeofenceMap);
