import React, { PureComponent } from "react";
import { LocationGreenSkinMap } from '../../components/Map/map-skins'

import {connect} from 'react-redux'
import  * as actions from '../../actions/actions-creators'
import {bindActionCreators} from 'redux'


class LocationsMap extends PureComponent {


  componentDidMount = async () => {
    window.addEventListener('load', this.handleLoad);
    this.props.actions.fetchDevicesData()
    this.refreshLocation = setInterval(()=>this.props.actions.fetchDevicesData(),30000)
  }
  componentWillUnmount = () => {
    clearInterval(this.refreshLocation);
  }
  handleLoad = () => {
    this.props.actions.googleIsInitalized()
  }
  render() {
    if (this.props.google) {
      return (
        <LocationGreenSkinMap
          containerElement={<div style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          iconAddress={this.props.iconAddress}
          google={this.props.google}
          devices={this.props.devices}
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
