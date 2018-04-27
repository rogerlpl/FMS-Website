import React from "react";
import { 
    Polygon,
    Polyline
  } from "react-google-maps";

 const  PolygonGeofences = (props) => {

    if (props.google) {
      return (
        
       props.paths.map(geofence => (
       geofence.attributes.visible && geofence.type === 'polygon' ?
        <Polygon
        path={geofence.area}
        onClick={props._onClick}
        key={Date.now() + Math.random()}
        />
        :geofence.attributes.visible && geofence.type === 'polyline'&& 
        <Polyline path={geofence.area}   
         onMouseOver={()=> alert('pulsaste una polilinea')}
        key={Date.now() + Math.random()} />
       ))
        )
    
    }else{
        return 'Google doesnt exist'
    }
  }

  export default PolygonGeofences