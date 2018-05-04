import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { push } from 'react-router-redux'
import SwitchRoutes from '../../components/Routes/routes'
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { withStyles, Button } from "material-ui";

import { Header, Footer, Sidebar } from "components";

import LocationsMap from 'views/Maps/LocationsMap.jsx'
import GeofenceMap from "../../views/Maps/GeofenceMap";

import appRoutes from "routes/app.jsx";
import appStyle from "variables/styles/appStyle.jsx";

import image from "assets/img/caribe-tours-2.jpg";
import logo from "assets/img/I-trackLogo.png";
import Bus from '../../assets/img/bus-marker.png'

import ModalContainer from '../../widgets/containers/modal';
import Modal from '../../widgets/components/modal';

import GeofenceNameDialog from '../../components/Dialogs/Maps/geofenceNameDialog'

import { connect } from 'react-redux'
import * as actions from '../../actions/actions-creators'
import { bindActionCreators } from 'redux'

import Login from './login'

const loginRoute = '/itrack/caribetrack/app/login'

class App extends React.Component {

  state = {
    mobileOpen: false,
    google: false,
  };
  handleToggleGeofenceModal = () => {
    this.props.actions.toggleGeofenceModal()
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/itrack/caribetrack/app/maps";
  }
  componentDidMount = () => {
    if (navigator.platform.indexOf('Win') > -1 && this.props.location.pathname !== loginRoute) {
      // eslint-disable-next-line
      const ps = new PerfectScrollbar(this.refs.mainPanel);

    }

  }
  componentWillMount = () =>{
       //como no se utiliza el componente switchRoutes para la ruta /maps se debe validar de esta manera para que el usuario  
        //no pueda acceder si no esta logeado se hace la validacion en el will mount debido a que si se hace en el render y se debe redireccionar
        //se ejecutaria una accion en medio del actualizado de este componente y violaria uno de los patrones de react
    !this.props.isLogged && this.props.path === '/itrack/caribetrack/app/maps' &&
              this.props.redirect(loginRoute)
  }
  handleSaveGeofence = () => {
    const polygonBounds = this.props.drewGeofences.get(0).overlay.getPath()
    let paths = [];

    for (let i = 0; i < polygonBounds.length; i++) {
      paths.push({ lat: polygonBounds.getAt(i).lat(), lng: polygonBounds.getAt(i).lng() });
    }
    this.props.actions.saveCurrentGeofence(paths, this.props.geofenceName, this.props.drewGeofences.get(0).type)

  }
  handleReDrawOnClick = () => {
    this.props.actions.resetDrewGeofences()
    this.props.actions.isDrawingGeofences()
    this.props.actions.deleteCurrentGeofence(this.props.drewGeofences.get(0).overlay)

  }

  handleGeofenceName = event => {
    this.props.actions.saveGeofenceName(event.target.value)
  }
  componentDidUpdate() {
    if (this.props.location.pathname !== loginRoute) {
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  render() {
    const { classes, ...rest } = this.props;
    if (this.props.location.pathname === loginRoute) {
      return <Login />
    } else {

      return (
        <div className={classes.wrapper}>
          <Sidebar
            routes={appRoutes}
            logoText={""}
            logo={logo}
            image={image}
            handleDrawerToggle={this.handleDrawerToggle}
            open={this.state.mobileOpen}
            color="red"
            {...rest}
          />
          <div className={classes.mainPanel} ref="mainPanel">
            <Header
              routes={appRoutes}
              handleDrawerToggle={this.handleDrawerToggle}
              color="danger"
              {...rest}
            />
            {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
            {this.getRoute() ? (
              <div className={classes.content}>
                <div className={classes.container}><SwitchRoutes isLogged={this.props.isLogged}/></div>
              </div>
            ) : (
                <LocationsMap
                  iconAddress={Bus}
                  defaultCenter={{ lat: 18.555353, lng: -70.8627778 }}
                />
              )}
            <ModalContainer>
              {this.props.modal.get('visibility') &&
                <Modal handleClick={this.handleToggleGeofenceModal} >
                  {!this.props.isDrawingGeofences &&
                    <div>
                      <Button
                        variant="raised"
                        color="primary"
                        className={classes.button}
                        fullWidth={true}
                        onClick={this.props.actions.toggleSaveGeofenceDialog}
                      >
                        Guardar
                  </Button>
                      <Button
                        variant="raised"
                        color="secondary"
                        className={classes.button}
                        fullWidth={true}
                        onClick={this.handleReDrawOnClick}
                      >
                        Volver a dibujar
                  </Button>

                    </div>
                  }



                  <GeofenceNameDialog
                    dialogVisibility={this.props.dialogVisibility}
                    handleOnClose={this.props.actions.toggleSaveGeofenceDialog}
                    handleGeofenceName={this.handleGeofenceName}
                    handleSaveGeofence={this.handleSaveGeofence}
                  />


                  <GeofenceMap
                    google={this.props.google}
                    defaultCenter={{ lat: 18.555353, lng: -70.8627778 }}
                  />
                </ Modal>
              }
            </ ModalContainer>
            {this.getRoute() ? <Footer /> : null}
          </div>
        </div>
      );
    }
  }
}

//const icon= new google.maps.MarkerImage(markerImage,null, null, null, new google.maps.Size(200,200)); 
App.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state, props) {

  return {
    google: state.getIn(['mapData', 'google']),
    modal: state.get('modal'),
    isDrawingGeofences: state.getIn(['modal', 'geofencesMap', 'isDrawingGeofences']),
    drewGeofences: state.getIn(['modal', 'geofencesMap', 'drewGeofences']),
    dialogVisibility: state.getIn(['modal', 'dialog', 'visibility']),
    geofenceName: state.getIn(['modal', 'dialog', 'geofenceName']),
    userData: state.getIn(['user','data']),
    isLogged: state.getIn(['user','isLogged']),
    path: state.getIn(['router']).location.pathname
  }

}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    redirect: bindActionCreators(push,dispatch)
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(appStyle)(App)));
