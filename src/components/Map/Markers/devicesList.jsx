import React from "react";
import { 
    Marker
  } from "react-google-maps";

 const  DevicesList = (props) => {

    if (props.google) {
      return props.devices.map(device => (
        <Marker
          onClick={props._onClick}
          position={{ lat: device.get('latitude'), lng: device.get('longitude')}}
          key={device.get('id')}
          defaultIcon={{
            url: props.iconAddress, // url
            scaledSize: new props.google.maps.Size(30, 30), // scaled size
          }} 
          defaultAnimation={1}
           title={device.get('name')}
          />
      ))
    }else{
        return 'Google doesnt exist'
    }
  }

  export default DevicesList