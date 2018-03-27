import React, { PureComponent } from "react";
import { GreenSkinMap } from '../../components/Map/map-skins'
import DevicesList from '../../components/Map/Markers/devicesList'

import {connect} from 'react-redux'
import  * as actions from '../../actions/actions-creators'
import {bindActionCreators} from 'redux'


class LocationsMap extends PureComponent {


  componentDidMount = async () => {
    window.addEventListener('load', this.handleLoad);
    this.props.actions.fetchDevicesData()
    this.setState({ markersList: <DevicesList _onClick={this.props.handleOpenModal} google={this.props.google} devices={this.props.devices} iconAddress={this.props.iconAddress} /> })
    
    
  }
  handleLoad = () => {
    this.props.actions.googleIsInitalized()
  }
  componentDidUpdate = () => {
    if (this.props.google && !this.props.googleReady) {
      this.props.actions.googleIsReady();
      this.setState({ markersList: <DevicesList _onClick={this.props.handleOpenModal} google={this.props.google} devices={this.props.devices} iconAddress={this.props.iconAddress} /> })
    }
  }
  render() {
    console.log(this.props.devices)
    if (this.props.google) {
      return (
        <GreenSkinMap
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
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
function mapStateToProps(state,props){
 
  return{
    google: state.get('mapData').get('google'),
    devices: state.getIn(['mapData','locationMap','devices']),
    googleReady: state.getIn(['mapData', 'locationMap','googleReady'])
  }

}
function mapDispatchToProps(dispatch){
  return{
    actions: bindActionCreators(actions,dispatch)
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(LocationsMap);
