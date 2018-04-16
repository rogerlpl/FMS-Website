import React from "react";
import {
  withStyles,
  IconButton,
  Hidden
} from "material-ui";
import { Person} from "material-ui-icons";

import headerLinksStyle from "variables/styles/headerLinksStyle";

import MapHeaderButtons from './mapHeaderButtons'

import {connect} from 'react-redux'
import {toggleGeofenceModal, toggleGeofenceAssignmentDialog}  from '../../actions/actions-creators'
import {bindActionCreators} from 'redux'

import GeofenceAssignment from '../Dialogs/Maps/geofenceAssignment'

class HeaderLinks extends React.Component {
  state = {
    open: false
  };
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };
  getRoute() {
    return  window.location.pathname 
  }
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.top}>
      {/* Botones de los mapas */}
      {
       this.getRoute() === "/maps" && <MapHeaderButtons handleToggleGeofenceModal={this.props.toggleGeofenceModal} handleToggleGeofenceAssignment={this.props.toggleGeofenceAssignmentDialog} classes={classes} />
      }
    
      <GeofenceAssignment visibility={this.props.geofenceAssignmentVisibility} handleToggleGeofenceAssignment={this.props.toggleGeofenceAssignmentDialog}/>

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
  }

}

function mapDispatchToProps (dispatch){
  return {
    toggleGeofenceModal: bindActionCreators(toggleGeofenceModal,dispatch),
    toggleGeofenceAssignmentDialog: bindActionCreators(toggleGeofenceAssignmentDialog,dispatch),
  }
} 

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(headerLinksStyle)(HeaderLinks));
