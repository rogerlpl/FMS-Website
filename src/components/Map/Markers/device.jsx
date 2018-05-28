import React from "react";
import {
  Marker,
  InfoWindow,
} from "react-google-maps";
import Paper from 'material-ui/Paper';

class Device extends React.Component {

  state = {
    isOpenInfoLeftClick: false,
    isOpenInfoRightClick: false
  }
  handleToggleOpenRightClick = () => {

    this.setState({
      isOpenInfoRightClick: true
    });

    // let el = document.getElementById('infowindow-content').parentNode.parentNode;
    //  console.log(document.getElementById('infowindow-content').parentNode)

    // el = el.previousElementSibling || el.previousSibling;
    // el.children[0].setAttribute('class', 'hidden');
    // el.children[2].setAttribute('class', 'hidden');
  }

  handleToggleCloseInfoRightClick = () => {
    this.setState({
      isOpenInfoRightClick: false
    });
  }
  handleToggleOpenClick = () => {

    this.setState({
      isOpenInfoLeftClick: true
    });


  }

  handleToggleCloseInfoClick = () => {
    this.setState({
      isOpenInfoLeftClick: false
    });
  }
  render() {
    if (this.props.google) {
      return <Marker
        onClick={this.handleToggleOpenClick}
        onRightClick={this.handleToggleOpenRightClick}
        position={{ lat: this.props.device.latitude, lng: this.props.device.longitude }}
        defaultIcon={{
          url: this.props.iconAddress, // url
          scaledSize: new window.google.maps.Size(40, 40), // scaled size
        }}
        title={this.props.device.name}
      >

        {this.state.isOpenInfoLeftClick &&
          <InfoWindow
            position={{ lat: this.props.device.latitude, lng: this.props.device.longitude }}
            onCloseClick={this.handleToggleCloseInfoClick}
          >
            <div>
              <span>{this.props.device.name}</span>
              <br />
              <span>Ultima sincronizacion: {this.props.device.lastupdate}</span>
            </div>
          </InfoWindow>

        }
        {this.state.isOpenInfoRightClick &&
          <InfoWindow
            className ='infowindow-content'
            position={{ lat: this.props.device.latitude, lng: this.props.device.longitude }}
            onCloseClick={this.handleToggleCloseInfoRightClick}
            options={{ pixelOffset: new window.google.maps.Size(185, 75) }}
          >
            <Paper>
              <span>Me dieron click derecho</span>
              <br />
              <span>Ultima sincronizacion: {this.props.device.lastupdate}</span>
            </Paper>
          </InfoWindow>

        }
      </Marker>

    } else {
      return 'Google doesnt exist'
    }
  }
}

export default Device