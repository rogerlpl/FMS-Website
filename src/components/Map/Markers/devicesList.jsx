import React from "react";
import {
  Marker,
  InfoWindow
} from "react-google-maps";


class DevicesList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }

  }

  handleToggleOpen = () => {

    this.setState({
      isOpen: true
    });
  }

  handleToggleClose = () => {
    this.setState({
      isOpen: false
    });
  }
  render() {
    if (this.props.google) {
      return <Marker
        onClick={this.handleToggleOpen}
        position={{ lat: this.props.device.latitude, lng: this.props.device.longitude }}
        defaultIcon={{
          url: this.props.iconAddress, // url
          scaledSize: new window.google.maps.Size(40, 40), // scaled size
        }}
        title={this.props.device.name}
      >

        {this.state.isOpen &&
          <InfoWindow
            position={{ lat: this.props.device.latitude, lng: this.props.device.longitude }}
            onCloseClick={this.handleToggleClose}
            options={{ pixelOffset: new window.google.maps.Size(0, -25) }}
          >
            <div>
              <span>{this.props.device.name}</span>
              <br />
              <span>Ultima sincronizacion: {this.props.device.lastupdate}</span>
            </div>
          </InfoWindow>

        }
      </Marker>

    } else {
      return 'Google doesnt exist'
    }
  }
}

export default DevicesList