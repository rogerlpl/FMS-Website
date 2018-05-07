import React from "react";
import {
  Marker,
  InfoWindow
} from "react-google-maps";
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer'
const DevicesList = (props) => {
  if (props.google) {
    return <MarkerClusterer
      averageCenter
      enableRetinaIcons
      gridSize={60}
    // styles={[
    // { textColor: 'white', height: 53, url: "images/m1.png", width: 53 },
    //  { textColor: 'white', height: 56, url: "images/m2.png", width: 56 }, 
    //  { textColor: 'white', height: 66, url: "images/m3.png", width: 66 },
    //   { textColor: 'white', height: 78, url: "images/m4.png", width: 78 }, 
    // { textColor: 'white', textSize: 15 }]}
    >
      {props.devices.map(device => (
        <Marker
          onClick={props.onClick}
          position={{ lat: device.latitude, lng: device.longitude }}
          key={device.id}
          defaultIcon={{
            url: props.iconAddress, // url
            scaledSize: new props.google.maps.Size(40, 40), // scaled size
          }}
          title={device.name}
        >
           {props.isOpen &&
             <InfoWindow position={{ lat: device.latitude, lng: device.longitude }} onCloseClick={props.onClick} options={{pixelOffset: new window.google.maps.Size(0,-20)}}>
              <span>Hola!</span>
            </InfoWindow>
        }  
        </Marker>
      ))
      }
   
    </MarkerClusterer>
  } else {
    return 'Google doesnt exist'
  }
}

export default DevicesList