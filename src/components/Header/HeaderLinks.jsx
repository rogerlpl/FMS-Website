import React from "react";
import {
  withStyles,
  IconButton,
  Hidden
} from "material-ui";
import { Person } from "material-ui-icons";

import headerLinksStyle from "variables/styles/headerLinksStyle";

import MapHeaderButtons from './mapHeaderButtons'

import { connect } from 'react-redux'
import * as actions from '../../actions/actions-creators'
import { bindActionCreators } from 'redux'

import GeofenceAssignment from '../Dialogs/Maps/geofenceAssignment'

class HeaderLinks extends React.Component {
  state = {
    open: false
  };
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };
  getRoute() {
    return window.location.pathname
  }
  handleClose = () => {
    this.setState({ open: false });
  };
  handleRadioChange = event => {
    this.props.actions.radioButtonChangeGeofenceAssignmentDialog(event.target.value)
    this.props.actions.fetchDevicesInGeofence(event.target.value)
    this.props.actions.fetchSearchDevices(event.target.value)
    this.props.actions.resetDevicesToAddGeofenceAssignmentDialog()
  //  this.props.actions.fetchAddDevicesToAGeofence(9,event.target.value)
  }
  handleSaveDevicesInGeofence = () =>{
    this.props.selectedItem.forEach(selectedItem => {
      alert(selectedItem)
      this.props.devicesSearch.forEach(device => {
        if(device.uniqueid===selectedItem){
          alert(device.id);
          this.props.actions.fetchAddDevicesToAGeofence(device.id,this.props.radioButtonValue)
        }
      })
    })
    this.props.actions.resetDevicesToAddGeofenceAssignmentDialog()
    setTimeout(()=>{
      this.props.actions.fetchDevicesInGeofence(this.props.radioButtonValue)    
      this.props.actions.fetchSearchDevices(this.props.radioButtonValue)
    },3000)
    
    
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.top}>
        {/* Botones de los mapas */}
        {
          this.getRoute() === "/maps" &&
          <MapHeaderButtons
            handleToggleGeofenceModal={this.props.actions.toggleGeofenceModal}
            handleToggleGeofenceAssignment={this.props.actions.toggleGeofenceAssignmentDialog}
            classes
          />
        }

        <GeofenceAssignment
          visibility={this.props.geofenceAssignmentVisibility}
          handleToggleGeofenceAssignment={this.props.actions.toggleGeofenceAssignmentDialog}
          geofences={this.props.geofences}
          devices={this.props.devices}
          radioChange={this.handleRadioChange}
          radioButtonValue={this.props.radioButtonValue}
          visibilityDevicesComponent ={this.props.visibilityDevicesComponent}
          _toggleDeviceComponents = {this.props.actions.toggleDeviceComponents}
          handleSaveDevicesInGeofence={this.handleSaveDevicesInGeofence}
          selectedItem ={this.props.selectedItem}
        />

        {/* Boton para las cuentas */}
        <IconButton
          color="inherit"
          aria-label="Person"
          className={classes.buttonLink}
        >
          <Person className={classes.links} />
          <Hidden mdUp>
            <p className={classes.linkText}>Perfil</p>
          </Hidden>
        </IconButton>
      </div>
    );
  }
}


function mapStateToProps(state, props) {

  return {
    geofenceAssignmentVisibility: state.getIn(['geofenceAssignmentDialog', 'visibility']),
    geofences: state.getIn(['geofenceAssignmentDialog', 'geofences']),
    radioButtonValue: state.getIn(['geofenceAssignmentDialog','radioButtonValue']),
    devices: state.getIn(['geofenceAssignmentDialog','devicesInCurrentGeofence']),
    visibilityDevicesComponent: state.getIn(['geofenceAssignmentDialog','addDevicesComponents','visibility']),
    selectedItem: state.getIn(['geofenceAssignmentDialog', 'addDevicesComponents', 'devicesToAdd']),
    devicesSearch: state.getIn(['geofenceAssignmentDialog', 'addDevicesComponents', 'devicesSearch']),
  }

}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(headerLinksStyle)(HeaderLinks));
