import React from "react";
import { 
    Polygon
  } from "react-google-maps";

 const  PolygonGeofences = (props) => {

    if (props.google) {
      return (
        
       props.paths.map(geofence => (
       geofence.attributes.visible && geofence.type === 'Polygon' && 
        <Polygon
        path={geofence.area}
        onClick={props._onClick}
        key={Date.now() + Math.random()}
        />
       ))
        )
    
    }else{
        return 'Google doesnt exist'
    }
  }

  export default PolygonGeofences