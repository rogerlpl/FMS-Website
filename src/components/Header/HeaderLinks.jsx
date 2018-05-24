import React from "react";
import { withStyles, IconButton, Hidden } from "material-ui";
import {
  Person,
  Directions,
  RemoveRedEye,
  Assignment,
  AssignmentInd,
  Search,
  Notifications,
  Drafts,
  Schedule,
  FiberDvr
}
  from "material-ui-icons";

import { CustomInput } from 'components'

import { withRouter } from "react-router-dom";

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
import { MenuItem, MenuList } from 'material-ui/Menu';
import Switch from 'material-ui/Switch';
import Tooltip from 'material-ui/Tooltip';

import { push } from 'react-router-redux'

class HeaderLinks extends React.PureComponent {

  componentDidMount = () => {
    this.props.actions.fetchNotifications()
  }
  handleGeofenceVisibility = geofenceid => event => {

    if (event.target.checked) {
      const geofences = this.props.geofences.map(geofence => {
        if (geofenceid === geofence.id) geofence.attributes.visible = !geofence.attributes.visible
        return geofence
      })
      this.props.actions.toggleGeofencesLocationMap(geofences)
    } else {
      const geofences = this.props.geofences.map(geofence => {
        if (geofenceid === geofence.id) geofence.attributes.visible = !geofence.attributes.visible

        return geofence
      })
      this.props.actions.toggleGeofencesLocationMap(geofences)

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
  handleMarkRead = (id) => (event) => {
    event.preventDefault()
    const attributes = {
      read: true
    }
    this.props.actions.fetchEventRead(id, JSON.stringify(attributes))
  }
  handleCloseNotificationsMenu = () => {
    this.props.actions.falseNotificationMenu()//optimizar esto solo usando una accion para actualizar el estado
  }
  handleCloseGeofencesMenu = (event) => {
    if (this.geofence.contains(event.target) || this.notifications.contains(event.target)) {
      return;
    }
    this.props.actions.falseGeofencesMenu() //optimizar esto solo usando una accion para actualizar el estado
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.top}>

        {/* Search */}
        <CustomInput
          formControlProps={{
            className: classes.top + " " + classes.search
          }}

          inputProps={{
            placeholder: "Buscar ficha",
            inputProps: {
              "aria-label": "Search",
            },
            style: {
              "color": "white",
              "underlineColor": "black"
            }
          }}
        />
        <IconButton
          color="inherit"
          aria-label="edit"
          className={classes.top + " " + classes.searchButton}
        >
          <Search className={classes.searchIcon} />
        </IconButton>
        {/* notoficacion */}
        <Manager style={{ display: "inline-block" }}>
          <Target>
            <div
              ref={node => {
                this.notifications = node;
              }}
            >
              <Tooltip
                id='tootlip-notifications'
                title='Notificaciones'
                enterDelay={300}
                leaveDelay={300}
              >
                <IconButton
                  color="inherit"
                  aria-label="Notifications"
                  aria-owns={this.props.visibilityNotification ? "menu-list" : null}
                  aria-haspopup="true"
                  onClick={() => (this.props.actions.toggleNotification())}
                  className={classes.buttonLink}
                >
                  <Notifications className={classes.links} />
                  {
                    this.props.unreadNotifications.length > 0 && <span className={classes.notifications}>{this.props.unreadNotifications.length}</span>
                  }
                  <Hidden mdUp>
                    <p onClick={() => (this.props.actions.toggleNotification())} className={classes.linkText}>
                      Notificaciones
                </p>
                  </Hidden>
                </IconButton>
              </Tooltip>
            </div>
          </Target>
          <Popper
            placement="bottom-start"
            eventsEnabled={this.props.visibilityNotification}
            className={
              classNames({ [classes.popperClose]: !this.props.visibilityNotification }) +
              " " +
              classes.pooperResponsive
            }
          >
            <ClickAwayListener onClickAway={() => this.handleCloseNotificationsMenu()}>
              <Collapse
                in={this.props.visibilityNotification}
                id="menu-list"
                style={{ transformOrigin: "0 0 0" }}
              >
                <Paper className={classes.dropdown} >
                  <MenuList role="menu">
                    {
                      this.props.unreadNotifications.map(notification => (
                        <MenuItem
                          onClick={this.handleMarkRead(notification.id)}
                          className={classes.dropdownItem}
                          key={notification.id}
                        >
                          <Grid container alignItems='center' justify='center' direction='row'>
                            <Grid item xs={10} zeroMinWidth>
                              {notification.type}
                            </Grid>
                            <Grid item xs={2} zeroMinWidth>
                              <IconButton color='inherit'>
                                <Drafts />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </MenuItem>
                      ))

                    }
                  </MenuList>
                </Paper>
              </Collapse>
            </ClickAwayListener>
          </Popper>
        </Manager>
        {/* Botones de operacion */}
        { this.props.path === '/itrack/caribetrack/app/maps'&&
        <div style={{ display: "inline-block" }}>
            {/*Dialog para asignar geocercas*/ }
            < GeofenceAssignment
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
          {/* boton para asignar geocercas a dispositivos */}
          <Tooltip
            id='tootlip-GeofenceAssignment'
            title='Asignar Geocercas'
            enterDelay={300}
            leaveDelay={300}
           >
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
          </ Tooltip>
          {/* boton para crear geocercas */}
          <Tooltip
            id='tootlip-creategeofence'
            title='Crear Geocercas'
            enterDelay={300}
            leaveDelay={300}
           >
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
          </ Tooltip>
          {/*boton para ver las geocercas */}
          <Manager style={{ display: "inline-block" }}>
            <Target>
              <div
                ref={node => {
                  this.geofence = node;
                }}
              >
                <Tooltip
                  id='tootlip-displaygeofences'
                  title='Mostrar Geocercas'
                  enterDelay={300}
                  leaveDelay={300}
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
                </ Tooltip>
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
                                  checked={geofence.attributes.visibile}
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
          </div>
        }
        {/* Botones para administracion */}
        { this.props.path === '/itrack/caribetrack/app/administracion'&&
        <div style={{ display: "inline-block" }}>
          
          {/* boton para asignar roles a usuarios */}
          <Tooltip
            id='tootlip-RolesAssignment'
            title='Administrar Usuarios'
            enterDelay={300}
            leaveDelay={300}
           >
            <IconButton
              color="inherit"
              aria-label="Administrar Usuarios"
              className={classes.buttonLink}
              onClick={()=>{alert('Me presionaste Administrar Usuarios')}}
            >
              <AssignmentInd className={classes.links} />
              <Hidden mdUp>
                <p className={classes.linkText}>Administrar Usuarios</p>
              </Hidden>
            </ IconButton>
          </ Tooltip>
          {/* boton para administrar horarios de rutas */}
          <Tooltip
            id='tootlip-scheduleRoutes'
            title='Administrar Horarios de Rutas'
            enterDelay={300}
            leaveDelay={300}
           >
            <IconButton
              color="inherit"
              aria-label="Administrar Horarios de Rutas"
              className={classes.buttonLink}
              onClick={()=>{alert('Me presionaste administrar horarios')}}
            >
              <Schedule className={classes.links} />
              <Hidden mdUp>
                <p className={classes.linkText}>Administrar Horarios de Rutas</p>
              </Hidden>
            </ IconButton>
          </ Tooltip>
          {/* boton para administrar mdvr */}
          <Tooltip
            id='tootlip-scheduleRoutes'
            title='Administrar MDVR'
            enterDelay={300}
            leaveDelay={300}
           >
            <IconButton
              color="inherit"
              aria-label="Administrar MDVR"
              className={classes.buttonLink}
              onClick={()=>{alert('Me presionaste Administrar MDVR')}}
            >
              <FiberDvr className={classes.links} />
              <Hidden mdUp>
                <p className={classes.linkText}>Administrar MDVR</p>
              </Hidden>
            </ IconButton>
          </ Tooltip>
        </div>
        }
        {/* Boton para las cuentas */}
        <Tooltip
          id='tootlip-account'
          title='Cuenta'
          enterDelay={300}
          leaveDelay={300}
         >
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
        </ Tooltip>
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
    visibleGeofences: state.getIn(['mapData', 'locationMap', 'visibleGeofences']),
    unreadNotifications: state.getIn(['notifications', 'type', 'unread']),
    visibilityNotification: state.getIn(['notifications', 'visibility']),
    path: state.getIn(['router']).location.pathname
  }

}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    redirect: bindActionCreators(push,dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(headerLinksStyle)(HeaderLinks)));
