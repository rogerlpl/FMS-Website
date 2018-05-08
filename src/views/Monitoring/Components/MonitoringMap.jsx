import React, { PureComponent } from "react";
import { LocationGreenSkinMap } from '../../../components/Map/map-skins'

import { connect } from 'react-redux'
import * as actions from '../../../actions/actions-creators'
import { bindActionCreators } from 'redux'


class LocationsMap extends PureComponent {


  componentDidMount = async () => {
    window.addEventListener('load', this.handleLoad);
    this.props.actions.fetchDevicesData()
    this.props.actions.fetchGeofencesData()
    this.props.actions.fetchGeofencesScanData()
    // this.refreshLocation = setInterval(() => (this.scan()), 30000)
  }
  scan = () => {
    this.props.actions.fetchGeofencesScanData()
    this.props.actions.fetchDevicesData()
    this.scanGeofences()
  }
  scanGeofences = () => {
    this.props.devicesInGeofences.forEach(all => {

      const polygon = new this.props.google.maps.Polygon({ paths: all.geofenceArea });

      //si la geocerca tiene dispositivos asignados procede a verificar si estan adentro o no
      if (all.devices.length > 0)
        all.devices.forEach(device => {
          const currentPosition = new this.props.google.maps.LatLng(device.latitude, device.longitude)

          let isInside //verifica el tipo de poligono para usar la funcion correcta
          if (all.geofenceType === 'polygon') {
            isInside = this.props.google.maps.geometry.poly.containsLocation(currentPosition, polygon)
          }
          else if (all.geofenceType === 'polyline') {
            isInside = this.props.google.maps.geometry.poly.isLocationOnEdge(currentPosition, polygon, 0.01) //tolerancia de 10 metros
          }
          //Si esta dentro de la geocerca
          if (isInside) {
            // verifica si el dispositivo dice que esta afuera de ser asi cambia 
            //el estado a que entro y notifica de lo contrario no hace nada
            if (!device.attributes.isInside) {
              device.attributes.isInside = true
              this.props.actions.fetchChangeDeviceGeofenceAttributes(device.id, all.geofenceId, JSON.stringify(device.attributes))

              const message = `La ficha:${device.uniqueid} ha entrado a ${all.geofenceName}`

              if (device.attributes.notify) {
                const attributes = {
                  read: false
                }
                this.props.actions.fetchCreateEvent(message, device.id, all.geofenceId, JSON.stringify(attributes))
                setTimeout(() => this.props.actions.fetchNotifications(), 3000)
              } else {
                const attributes = {
                  read: true
                }
                this.props.actions.fetchCreateEvent(message, device.id, all.geofenceId, JSON.stringify(attributes))
              }
            }
          } else {
            //de lo contrario verifica si el dispositivo dice que esta adentro de ser asi 
            //le cambia el estado a que salio y notifica de lo contrario no hace nada
            if (device.attributes.isInside) {
              device.attributes.isInside = false
              this.props.actions.fetchChangeDeviceGeofenceAttributes(device.id, all.geofenceId, JSON.stringify(device.attributes))

              const message = `La ficha:${device.uniqueid} ha salido de ${all.geofenceName}`

              if (device.attributes.notify) {
                const attributes = {
                  read: false
                }
                this.props.actions.fetchCreateEvent(message, device.id, all.geofenceId, JSON.stringify(attributes))

              } else {
                const attributes = {
                  read: true
                }
                this.props.actions.fetchCreateEvent(message, device.id, all.geofenceId, JSON.stringify(attributes))
              }

            }
          }

        })



    })

    setTimeout(() => this.props.actions.fetchNotifications(), 3000)
  }
  componentWillUnmount = () => {
    //  clearInterval(this.refreshLocation);
  }
  handleLoad = () => {
    this.props.actions.googleIsInitalized()
  }
 
  render() {
    if (window.google) {
      return (
        <LocationGreenSkinMap
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          iconAddress={this.props.iconAddress}
          google={window.google}
          devices={this.props.devices}
          defaultCenter={this.props.defaultCenter}
          paths={this.props.paths}
        />
      );
    }
    return <div>No ha cargado google</div>
  }
}
function mapStateToProps(state, props) {

  return {
    google: state.get('mapData').get('google'),
    devices: state.getIn(['mapData', 'locationMap', 'devices']),
    paths: state.getIn(['geofences', 'geofences']),
    devicesInGeofences: state.getIn(['geofences', 'devicesInGeofences'])
  }

}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LocationsMap);
