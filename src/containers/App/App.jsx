import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { withStyles } from "material-ui";

import { Header, Footer, Sidebar } from "components";

import LocationsMap from 'views/Maps/LocationsMap.jsx'
import GeofenceMap from "../../views/Maps/GeofenceMap";

import appRoutes from "routes/app.jsx";

import appStyle from "variables/styles/appStyle.jsx";

import image from "assets/img/caribe-tours-2.jpg";
import logo from "assets/img/I-trackLogo.png";
import Bus from '../../components/Icons/bus.svg'

import ModalContainer from '../../widgets/containers/modal';
import Modal from '../../widgets/components/modal';

import {connect} from 'react-redux'
import * as actions from '../../actions/actions-creators'
import {bindActionCreators} from 'redux'

const switchRoutes = (
  <Switch>
    {appRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

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
    return this.props.location.pathname !== "/maps";
  }
  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      // eslint-disable-next-line
      const ps = new PerfectScrollbar(this.refs.mainPanel);

    }
    window.addEventListener('load', this.handleLoad);
  }
  handleLoad = () => {
    this.props.actions.googleIsInitalized()
  }

  componentDidUpdate() {
    this.refs.mainPanel.scrollTop = 0;
  }
  render() {
    const { classes, ...rest } = this.props;
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
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
              <LocationsMap
                iconAddress={Bus}
                defaultCenter={{ lat: 18.555353, lng: -70.8627778 }}
              />

            )}
            <ModalContainer>
              { this.props.modal.get('visibility') &&
              <Modal handleClick={this.handleToggleGeofenceModal} >
                  <GeofenceMap
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

//const icon= new google.maps.MarkerImage(markerImage,null, null, null, new google.maps.Size(200,200)); 
App.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state,props){

  return{
    modal: state.get('modal')
  }

}
function mapDispatchToProps(dispatch){
  return{
    actions: bindActionCreators(actions,dispatch)
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(appStyle)(App));
