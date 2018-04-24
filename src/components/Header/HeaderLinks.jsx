import React from "react";
import { withStyles, IconButton, Hidden } from "material-ui";
import { Person, Directions, RemoveRedEye, Assignment } from "material-ui-icons";

import headerLinksStyle from "variables/styles/headerLinksStyle";
import Grid from 'material-ui/Grid';
import { connect } from 'react-redux'
import * as actions from '../../actions/actions-creators'
import { bindActionCreators } from 'redux'
import GeofenceAssignment from '../Dialogs/Maps/geofenceAssignment'
import classNames from 'classnames'
import { Manager, Target, Popper } from 'react-popper';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';
import Collapse from 'material-ui/transitions/Collapse';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import Switch from 'material-ui/Switch';

class HeaderLinks extends React.Component {


  getRoute() {
    return window.location.pathname
  }
  handleGeofenceVisibility = geofenceid => event =>{
      console.log(geofenceid)
    if(event.target.checked){
    const geofence=  this.props.geofences.filter(geofence=>(
        geofenceid === geofence.id ? geofence : false
      ))
      console.log(geofence)
     // this.props.drawGeofencesLocationMap()
     }else{
      //this.props.deleteGeofenceLocationMap(geofenceid)
     }
  }
  handleRadioChange = event => {
    this.props.actions.radioButtonChangeGeofenceAssignmentDialog(event.target.value)
    this.props.actions.fetchDevicesInGeofence(event.target.value)
    this.props.actions.fetchSearchDevices(event.target.value)
    this.props.actions.resetDevicesToAddGeofenceAssignmentDialog()
    //  this.props.actions.fetchAddDevicesToAGeofence(9,event.target.value)
  }
  handleSaveDevicesInGeofence = () => {
    this.props.selectedItem.forEach(selectedItem => {
      this.props.devicesSearch.forEach(device => {
        if (device.uniqueid === selectedItem) {
          this.props.actions.fetchAddDevicesToAGeofence(device.id, this.props.radioButtonValue)
        }
      })
    })
    this.props.actions.resetDevicesToAddGeofenceAssignmentDialog()
    setTimeout(() => {
      this.props.actions.fetchDevicesInGeofence(this.props.radioButtonValue)
      this.props.actions.fetchSearchDevices(this.props.radioButtonValue)
    }, 3000)


  }
  handleCloseGeofencesMenu = (event) => {
    if (this.target.contains(event.target)) {
      return;
    }
    this.props.actions.falseGeofencesMenu()
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.top}>
        {/* Botones de los mapas */}
        {/* {
          this.getRoute() === "/maps" &&
          // <MapHeaderButtons
          //   handleToggleGeofenceModal={this.props.actions.toggleGeofenceModal}
          //   handleToggleGeofenceAssignment={this.props.actions.toggleGeofenceAssignmentDialog}
          //   classes
          // />
        } */}

        <GeofenceAssignment
          visibility={this.props.geofenceAssignmentVisibility}
          handleToggleGeofenceAssignment={this.props.actions.toggleGeofenceAssignmentDialog}
          geofences={this.props.geofences}
          devices={this.props.devices}
          radioChange={this.handleRadioChange}
          radioButtonValue={this.props.radioButtonValue}
          visibilityDevicesComponent={this.props.visibilityDevicesComponent}
          _toggleDeviceComponents={this.props.actions.toggleDeviceComponents}
          handleSaveDevicesInGeofence={this.handleSaveDevicesInGeofence}
          selectedItem={this.props.selectedItem}
        />
        {/* boton para crear geocercas */}
        <IconButton
          color="inherit"
          aria-label="Crear Geocercas"
          className={classes.buttonLink}
          onClick={this.props.actions.toggleGeofenceModal}
        >
          <Directions className={classes.links} />
          <Hidden mdUp>
            <p className={classes.linkText}>Rutas</p>
          </Hidden>
        </ IconButton>
        {/* boton para asignar geocercas a dispositivos */}
        <IconButton
          color="inherit"
          aria-label="Asignar Geocercas"
          className={classes.buttonLink}
          onClick={this.props.actions.toggleGeofenceAssignmentDialog}
        >
          <Assignment className={classes.links} />
          <Hidden mdUp>
            <p className={classes.linkText}>Asignar Geocercas</p>
          </Hidden>
        </ IconButton>
        {/*boton para ver las geocercas */}
        <Manager style={{ display: "inline-block" }}>
          <Target>
            <div
              ref={node => {
                this.target = node;
              }}
            >
              <IconButton
                color="inherit"
                aria-label="Ver Geocercas"
                aria-owns={this.props.open ? 'menu-list-collapse' : null}
                aria-haspopup="true"
                onClick={this.props.actions.toggleGeofencesMenu}
                className={classes.buttonLink}
              >
                <RemoveRedEye className={classes.links} />
                <Hidden mdUp>
                  <p className={classes.linkText}>Geocercas</p>
                </Hidden>
              </ IconButton>
            </div>
          </Target>
          <Popper
            placement="bottom-start"
            eventsEnabled={this.props.open}
            className={classNames({ [classes.popperClose]: !this.props.open }) +
              " " +
              classes.pooperResponsive
            }

          >
            <ClickAwayListener onClickAway={this.handleCloseGeofencesMenu}>
              <Collapse in={this.props.open} id="menu-list-collapse" style={{ transformOrigin: '0 0 0' }}>
                <Paper className={classes.dropdown}>
                  <Grid container justify='center' direction='column' alignItems='center'>
                    {
                      this.props.geofences.map(geofence => (

                        <MenuItem key={geofence.id} >
                          <Grid container alignItems='center' direction='row'>

                            <Grid item xs={6}>
                                {geofence.name}
                            </Grid>
                            <Grid item xs={6}>
                              <Switch
                                checked={geofence.attributes.visible}
                                color='primary'
                                onChange={this.handleGeofenceVisibility(geofence.id)}
                              />
                            </Grid>
                          </Grid>
                        </MenuItem>
                      ))

                    }
                  </Grid>
                </Paper>
              </Collapse>
            </ClickAwayListener>
          </Popper>
        </Manager>
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
    geofenceAssignmentVisibility: state.getIn(['geofences', 'visibility']),
    geofences: state.getIn(['geofences', 'geofences']),
    radioButtonValue: state.getIn(['geofences', 'radioButtonValue']),
    devices: state.getIn(['geofences', 'devicesInCurrentGeofence']),
    visibilityDevicesComponent: state.getIn(['geofences', 'addDevicesComponents', 'visibility']),
    selectedItem: state.getIn(['geofences', 'addDevicesComponents', 'devicesToAdd']),
    devicesSearch: state.getIn(['geofences', 'addDevicesComponents', 'devicesSearch']),
    open: state.getIn(['geofences', 'geofencesVisibilityMenu', 'open']),
  }

}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(headerLinksStyle)(HeaderLinks));
